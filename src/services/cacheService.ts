import NodeCache from "node-cache";

const PERIOD = 60 * 60 * 8; // 8 hours
const cache = new NodeCache({ stdTTL: PERIOD });

export function setCache<T>(key: string, data: T) {
   cache.set(key, data);
}

export function getCache<T>(key: string): T | undefined {
   return cache.get(key);
}

export function clearCache(key: string) {
   cache.del(key);
}

export function getCacheInstance() {
   return cache;
}
