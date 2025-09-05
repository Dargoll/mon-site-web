// api/monitor.js
import { authenticate, requirePermission } from './middleware/auth.js';
import { getActiveSources } from './config/sources.js';

export default async function handler(req, res) {
  try {
    const { action = 'status' } = req.query;

    // Health check public (sans auth)
    if (action === 'health') {
      return res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      });
    }

    // Autres actions nécessitent une authentification
    const authResult = await authenticate(req);
    const permissionCheck = requirePermission('read')(authResult);
    
    if (!permissionCheck.success) {
      return res.status(401).json({
        error: permissionCheck.message,
        code: permissionCheck.code
      });
    }

    switch (action) {
      case 'status':
        return handleStatus(req, res);
      
      case 'config':
        return handleConfig(req, res, authResult);
      
      default:
        return res.status(400).json({
          error: 'Invalid action',
          available_actions: ['status', 'config', 'health']
        });
    }

  } catch (error) {
    console.error('Monitor endpoint error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
    });
  }
}

async function handleStatus(req, res) {
  const activeSources = getActiveSources();
  
  const status = {
    system: {
      status: 'operational',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    },
    sources: {
      total: activeSources.length,
      active: activeSources.filter(s => s.enabled).length,
      list: activeSources.map(s => ({
        name: s.name,
        enabled: s.enabled,
        priority: s.priority
      }))
    },
    environment: {
      node_env: process.env.NODE_ENV,
      vercel_env: process.env.VERCEL_ENV
    }
  };

  res.status(200).json(status);
}

async function handleConfig(req, res, authResult) {
  // Seuls les admins peuvent voir la config
  if (authResult.key_type !== 'admin') {
    return res.status(403).json({
      error: 'Admin access required'
    });
  }

  const config = {
    api_keys: {
      admin_configured: !!process.env.ADMIN_API_KEY,
      internal_configured: !!process.env.INTERNAL_API_KEY,
      readonly_configured: !!process.env.READONLY_API_KEY
    },
    external_apis: {
      twitter_configured: !!process.env.TWITTER_BEARER_TOKEN,
      news_api_configured: !!process.env.NEWS_API_KEY
    }
  };

  res.status(200).json(config);
}