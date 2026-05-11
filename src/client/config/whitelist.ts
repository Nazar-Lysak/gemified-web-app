/**
 * Whitelist of allowed domains where the widget can be displayed.
 * Add domains without protocol (http/https) and without trailing slash.
 */
const localHosts = ["localhost", "127.0.0.1"];
const productionDomains = ["uat-74995-petcare-purinattt-unitedkingdom.pantheonsite.io"];

export const ALLOWED_DOMAINS = [
  ...localHosts,
  ...productionDomains,
  "staging.example.com",
] as const;

/**
 * Check if the current domain is in the whitelist.
 * @param hostname - The hostname to check (e.g., window.location.hostname)
 * @returns true if the domain is allowed, false otherwise
 */
export const isAllowedDomain = (hostname: string): boolean => {
  const domainWithoutPort = hostname.split(":")[0];
  
  return ALLOWED_DOMAINS.some((allowedDomain) => {
    if (domainWithoutPort === allowedDomain) {
      return true;
    }
    
    if (allowedDomain.startsWith("*.")) {
      const baseDomain = allowedDomain.slice(2);
      return domainWithoutPort.endsWith(`.${baseDomain}`) || domainWithoutPort === baseDomain;
    }
    
    return false;
  });
};

/**
 * Check if the widget should be displayed on the current page.
 * @returns true if widget is allowed, false otherwise
 */
export const isWidgetAllowed = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  
  return isAllowedDomain(window.location.hostname);
};
