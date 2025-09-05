// api/lib/base-source.js
import { getSourceConfig } from '../config/sources.js';

export default class BaseSource {
  constructor(sourceName) {
    this.sourceName = sourceName;
    this.config = getSourceConfig(sourceName);
    this.rateLimiter = new Map();
  }

  // Méthode abstraite - doit être implémentée par chaque source
  async fetchRawData(query, options = {}) {
    throw new Error('fetchRawData must be implemented by subclass');
  }

  // Méthode abstraite - transformation des données brutes
  transformData(rawData) {
    throw new Error('transformData must be implemented by subclass');
  }

  // Méthode principale publique
  async getData(query, options = {}) {
    const startTime = Date.now();
    
    try {
      // Vérifier le rate limiting
      await this.checkRateLimit();
      
      // Fetch des données
      const rawData = await this.fetchRawData(query, options);
      
      // Transformation
      const transformedData = this.transformData(rawData);
      
      // Validation
      const validatedData = this.validateData(transformedData);
      
      return validatedData;
      
    } catch (err) {
      console.error(`Error in ${this.sourceName}:`, err.message);
      throw err;
    }
  }

  // Gestion du rate limiting
  async checkRateLimit() {
    const now = Date.now();
    const hourKey = Math.floor(now / (1000 * 60 * 60));
    
    const hourlyCount = this.rateLimiter.get(`hour_${hourKey}`) || 0;
    
    if (hourlyCount >= this.config.rate_limit.requests_per_hour) {
      throw new Error(`Rate limit exceeded for ${this.sourceName}`);
    }
    
    this.rateLimiter.set(`hour_${hourKey}`, hourlyCount + 1);
  }

  // Validation des données de sortie
  validateData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format');
    }

    return {
      source: this.sourceName,
      timestamp: new Date().toISOString(),
      count: data.items?.length || 0,
      items: data.items || [],
      metadata: data.metadata || {}
    };
  }

  // Utilitaires pour l'authentification
  getAuthHeaders() {
    const auth = this.config.auth;
    if (!auth || auth.type === 'none') return {};

    const token = process.env[auth.env_key];
    if (!token) {
      throw new Error(`Missing authentication token for ${this.sourceName}`);
    }

    switch (auth.type) {
      case 'bearer':
        return { [auth.header]: `Bearer ${token}` };
      case 'header':
        return { [auth.header]: token };
      default:
        return {};
    }
  }
}