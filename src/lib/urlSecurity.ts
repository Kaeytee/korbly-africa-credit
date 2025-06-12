/**
 * URL sanitization utilities for enhanced security
 * Helps protect against URL injection and parameter tampering
 */

/**
 * Validates and sanitizes URL path parameters
 * @param param The parameter to sanitize
 * @returns Sanitized parameter or null if invalid
 */
export const sanitizeUrlParam = (param: string | undefined): string | null => {
  if (!param) return null;
  
  // Remove any potentially harmful characters
  const sanitized = param.replace(/[^\w\-._~]/g, '');
  
  // If sanitization removed everything, return null
  if (!sanitized) return null;
  
  return sanitized;
};

/**
 * Validates if a URL parameter matches an expected format
 */
export const isValidUrlParam = (param: string | undefined, allowedValues: string[]): boolean => {
  if (!param) return false;
  return allowedValues.includes(param);
};

/**
 * Validates if a URL path is well-formed and doesn't contain attempts to navigate
 * to parent directories or other potentially harmful patterns
 */
export const isUrlPathSafe = (path: string): boolean => {
  // Check for path traversal attempts
  if (path.includes('..')) return false;
  
  // Check for protocol specification which could indicate URL protocol hijacking
  if (/^\w+:\/\//.test(path)) return false;
  
  // Check for other potentially harmful patterns
  if (path.includes('<') || path.includes('>')) return false;
  if (path.includes('javascript:')) return false;
  
  return true;
};

/**
 * Builds a safe URL with sanitized parameters
 */
export const buildSecureUrl = (
  basePath: string, 
  params: Record<string, string | undefined>
): string => {
  // Ensure base path is safe
  if (!isUrlPathSafe(basePath)) {
    console.error(`[SECURITY] Unsafe base path detected: ${basePath}`);
    return '/';
  }
  
  const sanitizedParams: Record<string, string> = {};
  let hasInvalidParam = false;
  
  // Sanitize all parameters
  Object.entries(params).forEach(([key, value]) => {
    const sanitized = sanitizeUrlParam(value);
    if (sanitized) {
      sanitizedParams[key] = sanitized;
    } else {
      console.error(`[SECURITY] Invalid URL parameter: ${key}=${value}`);
      hasInvalidParam = true;
    }
  });
  
  // If any parameter was invalid, return to safe location
  if (hasInvalidParam) {
    return '/';
  }
  
  // Build URL with sanitized parameters
  let url = basePath;
  const queryParams: string[] = [];
  
  Object.entries(sanitizedParams).forEach(([key, value], index) => {
    if (url.includes(`:${key}`)) {
      // Replace path parameter
      url = url.replace(`:${key}`, value);
    } else {
      // Add as query parameter
      queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });
  
  // Add query parameters if any
  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }
  
  return url;
};
