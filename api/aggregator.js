// api/aggregator.js
import { authenticate } from './middleware/auth.js';
import { getActiveSources } from './config/sources.js';
import TwitterSource from './sources/twitter.js';

// Registry des sources disponibles
const SOURCE_REGISTRY = {
  twitter: TwitterSource
};

export default async function handler(req, res) {
  const startTime = Date.now();
  
  try {
    // Authentification
    const authResult = await authenticate(req);
    if (!authResult.success) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: authResult.message 
      });
    }

    // Parsing des paramètres
    const {
      sources = 'all',
      query = '',
      limit = 50,
      format = 'aggregated'
    } = req.query;

    // Déterminer les sources à utiliser
    const activeSources = getActiveSources();
    const requestedSources = sources === 'all' 
      ? activeSources
      : activeSources.filter(source => sources.split(',').includes(source.name));

    if (requestedSources.length === 0) {
      return res.status(400).json({
        error: 'No valid sources specified',
        available_sources: activeSources.map(s => s.name)
      });
    }

    console.log(`Aggregating data from ${requestedSources.length} sources:`, 
                requestedSources.map(s => s.name).join(', '));

    // Exécution des sources
    const results = await executeSourcesParallel(requestedSources, query);

    // Formatage de la réponse
    const response = formatAggregatedResponse(results, parseInt(limit));

    // Headers de cache
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    
    return res.status(200).json(response);

  } catch (error) {
    console.error('Aggregator error:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred',
      timestamp: new Date().toISOString()
    });
  }
}

async function executeSourcesParallel(sources, query) {
  const promises = sources.map(async (sourceConfig) => {
    try {
      const SourceClass = SOURCE_REGISTRY[sourceConfig.name];
      if (!SourceClass) {
        throw new Error(`Source class not found: ${sourceConfig.name}`);
      }

      const source = new SourceClass();
      const data = await source.getData(query);
      
      return {
        source: sourceConfig.name,
        success: true,
        data
      };
    } catch (error) {
      console.error(`Source ${sourceConfig.name} failed:`, error.message);
      return {
        source: sourceConfig.name,
        success: false,
        error: error.message,
        data: { items: [], count: 0 }
      };
    }
  });

  const results = await Promise.allSettled(promises);
  return results.map(result => result.status === 'fulfilled' ? result.value : result.reason);
}

function formatAggregatedResponse(results, limit) {
  // Collecte de tous les items
  const allItems = [];
  const sourceStats = {};
  
  results.forEach(result => {
    if (result.success && result.data?.items) {
      allItems.push(...result.data.items);
      sourceStats[result.source] = {
        items_count: result.data.items.length,
        success: true
      };
    } else {
      sourceStats[result.source] = {
        items_count: 0,
        success: false,
        error: result.error
      };
    }
  });

  // Tri par date de publication (plus récent en premier)
  allItems.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  // Application de la limite
  const limitedItems = allItems.slice(0, limit);

  return {
    format: 'aggregated',
    timestamp: new Date().toISOString(),
    summary: {
      total_sources: results.length,
      successful_sources: results.filter(r => r.success).length,
      total_items: limitedItems.length,
      limit_applied: limit
    },
    items: limitedItems,
    sources: sourceStats
  };
}