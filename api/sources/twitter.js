// api/sources/twitter.js
import BaseSource from '../lib/base-source.js';

export default class TwitterSource extends BaseSource {
  constructor() {
    super('twitter');
  }

  async fetchRawData(query, options = {}) {
    const endpoint = this.config.endpoints.search;
    const params = {
      ...this.config.default_params,
      query: query || this.config.search_queries.join(' OR '),
      ...options
    };

    const url = new URL(endpoint);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders()
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Twitter API error ${response.status}: ${errorText}`);
    }

    return await response.json();
  }

  transformData(rawData) {
    if (!rawData || !rawData.data) {
      return {
        items: [],
        metadata: {
          total_results: 0,
          source: 'twitter'
        }
      };
    }

    const items = rawData.data.map(tweet => ({
      id: tweet.id,
      title: this.extractTweetTitle(tweet.text),
      description: tweet.text,
      url: `https://twitter.com/user/status/${tweet.id}`,
      published_at: tweet.created_at,
      author: tweet.author_id,
      metadata: {
        public_metrics: tweet.public_metrics,
        hashtags: this.extractHashtags(tweet.text),
        mentions: this.extractMentions(tweet.text)
      }
    }));

    return {
      items,
      metadata: {
        total_results: rawData.meta?.result_count || items.length,
        source: 'twitter'
      }
    };
  }

  extractTweetTitle(text) {
    if (!text) return '';
    const words = text.split(' ').slice(0, 8);
    return words.join(' ') + (words.length < text.split(' ').length ? '...' : '');
  }

  extractHashtags(text) {
    if (!text) return [];
    const hashtags = text.match(/#\w+/g) || [];
    return hashtags.map(tag => tag.substring(1));
  }

  extractMentions(text) {
    if (!text) return [];
    const mentions = text.match(/@\w+/g) || [];
    return mentions.map(mention => mention.substring(1));
  }
}