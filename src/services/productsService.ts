import { getProductIdentifiers, getProducts, getProductPrices } from "./ozonService";
import { getCache, setCache } from "./cacheService";

const CACHE_KEY = "products";
const REFRESH_INTERVAL = 8 * 60 * 60 * 1000; // 8 hours

/**
 * Loads the list of products from the OZON API.
 * Returns a list of products with the required fields.
 */
async function fetchProductsFromOzon() {
   const identifiers = await getProductIdentifiers();

   const listOfProducts = await Promise.all(
      identifiers.map(async (item) => {
         const productDetails = await getProducts(item.product_id);
         const product = productDetails.items[0];

         return {
            ...item,
            name: product.name,
            sku: product.sku,
            has_stock: product.stocks.has_stock,
            created_at: product.created_at,
            primary_image: product.primary_image,
            images: product.images,
         };
      })
   );

   const listOfProductsFull = await Promise.all(
      listOfProducts.map(async (item) => {
         const productPrice = await getProductPrices(item.product_id);
         const priceData = productPrice.items[0].price;

         const rawPrice = priceData.min_price - priceData.net_price;
         const minAllowedPrice = priceData.min_price * 0.6;
         const finalPrice = rawPrice > minAllowedPrice ? rawPrice : minAllowedPrice;

         return {
            ...item,
            price: finalPrice,
         };
      })
   );

   return listOfProductsFull.filter((item) => item.has_stock && item.price > 0);
}

/**
 * Returns products from cache or loads new ones if cache is empty.
 */
export async function getProductsData() {
   const cached = getCache<any[]>(CACHE_KEY);
   if (cached) {
      return cached;
   }

   const products = await fetchProductsFromOzon();
   setCache(CACHE_KEY, products);

   return products;
}

/**
 * Loads data when the server starts and sets up auto-update every 8 hours.
 */
export async function initializeProductCache() {
   try {
      const products = await fetchProductsFromOzon();
      setCache(CACHE_KEY, products);

      setInterval(async () => {
         try {
            const updated = await fetchProductsFromOzon();
            setCache(CACHE_KEY, updated);
         } catch (err) {
            console.error("⚠️ ERROR:  initializeProductCache OZON data update:", err);
         }
      }, REFRESH_INTERVAL);
   } catch (err) {
      console.error("❌ ERROR: initializeProductCache product cache initialization", err);
   }
}
