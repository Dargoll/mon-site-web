// api/middleware/auth.js
import crypto from 'crypto';

const API_KEYS = {
  admin: process.env.ADMIN_API_KEY,
  internal: process.env.INTERNAL_API_KEY,
  readonly: process.env.READONLY_API_KEY
};

const PERMISSIONS = {
  admin: ['read', 'write', 'delete', 'metrics', 'config'],
  internal: ['read', 'write', 'metrics'],
  readonly: ['read']
};

const rateLimits = new Map();

export async function authenticate(req) {
  try {
    const apiKey = req.headers['x-api-key'] || 
                   req.headers['authorization']?.replace('Bearer ', '') ||
                   req.query.api_key;

    if (!apiKey) {
      return {
        success: false,
        message: 'API key required',
        code: 'MISSING_API_KEY'
      };
    }

    const keyType = validateApiKey(apiKey);
    if (!keyType) {
      return {
        success: false,
        message: 'Invalid API key',
        code: 'INVALID_API_KEY'
      };
    }

    const rateLimitResult = checkRateLimit(apiKey, keyType);
    if (!rateLimitResult.allowed) {
      return {
        success: false,
        message: `Rate limit exceeded: ${rateLimitResult.message}`,
        code: 'RATE_LIMIT_EXCEEDED'
      };
    }

    return {
      success: true,
      key_type: keyType,
      permissions: PERMISSIONS[keyType]
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      message: 'Authentication failed',
      code: 'AUTH_ERROR'
    };
  }
}

function validateApiKey(providedKey) {
  for (const [keyType, expectedKey] of Object.entries(API_KEYS)) {
    if (expectedKey && secureCompare(providedKey, expectedKey)) {
      return keyType;
    }
  }
  return null;
}

function secureCompare(a, b) {
  if (!a || !b || a.length !== b.length) {
    return false;
  }
  
  const bufferA = Buffer.from(a, 'utf8');
  const bufferB = Buffer.from(b, 'utf8');
  
  return crypto.timingSafeEqual(bufferA, bufferB);
}

function checkRateLimit(apiKey, keyType) {
  const now = Date.now();
  const windowSize = 60 * 60 * 1000; // 1 heure
  const limits = {
    admin: 1000,
    internal: 500,
    readonly: 100
  };

  const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex').substring(0, 16);
  
  if (!rateLimits.has(keyHash)) {
    rateLimits.set(keyHash, {
      count: 0,
      window_start: now
    });
  }

  const limit = rateLimits.get(keyHash);
  
  if (now - limit.window_start > windowSize) {
    limit.count = 0;
    limit.window_start = now;
  }

  limit.count++;
  
  const maxRequests = limits[keyType] || 50;
  const allowed = limit.count <= maxRequests;
  
  return {
    allowed,
    current: limit.count,
    limit: maxRequests,
    message: allowed ? 'OK' : `Limit of ${maxRequests} requests per hour exceeded`
  };
}

export function requirePermission(permission) {
  return (authResult) => {
    if (!authResult.success) {
      return authResult;
    }

    if (!authResult.permissions.includes(permission)) {
      return {
        success: false,
        message: `Permission '${permission}' required`,
        code: 'INSUFFICIENT_PERMISSIONS'
      };
    }

    return authResult;
  };
}