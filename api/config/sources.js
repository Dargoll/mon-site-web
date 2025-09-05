// api/config/sources.js
export const SOURCES_CONFIG = {
  twitter: {
    name: 'Twitter/X',
    enabled: true,
    priority: 1,
    cache_ttl: 300, // 5 minutes
    rate_limit: {
      requests_per_hour: 100,
      requests_per_day: 1000
    },
    endpoints: {
      search: 'https://api.twitter.com/2/tweets/search/recent'
    },
    auth: {
      type: 'bearer',
      header: 'Authorization',
      env_key: 'TWITTER_BEARER_TOKEN'
    },
    default_params: {
      max_results: 10,
      'tweet.fields': 'created_at,author_id,public_metrics'
    },
    search_queries: [
      'UNSA Police',
      'Loïc Walder',
      '@UNSAPOLICE'
    ]
  },

  newsapi: {
    name: 'NewsAPI',
    enabled: true,
    priority: 2,
    cache_ttl: 600, // 10 minutes
    rate_limit: {
      requests_per_hour: 50,
      requests_per_day: 500
    },
    endpoints: {
      everything: 'https://newsapi.org/v2/everything'
    },
    auth: {
      type: 'header',
      header: 'X-API-Key',
      env_key: 'NEWS_API_KEY'
    },
    default_params: {
      language: 'fr',
      sortBy: 'publishedAt',
      pageSize: 20
    },
    search_queries: [
      'police syndicat UNSA',
      'sécurité publique France'
    ]
  }
};

export const CACHE_CONFIG = {
  default_ttl: 300,
  max_entries: 1000,
  storage_type: 'memory',
  compression: true
};

export function getSourceConfig(sourceName) {
  const config = SOURCES_CONFIG[sourceName];
  if (!config) {
    throw new Error(`Source configuration not found: ${sourceName}`);
  }
  return config;
}

export function getActiveSources() {
  return Object.entries(SOURCES_CONFIG)
    .filter(([_, config]) => config.enabled)
    .sort(([_, a], [__, b]) => a.priority - b.priority)
    .map(([name, config]) => ({ name, ...config }));
}