import { getProductIdentifiers, getProducts, getProductPrices } from "./ozonService";
import { getCache, setCache } from "./cacheService";

const CACHE_KEY = "products";
const REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

/**
 * Загружает список товаров с OZON API.
 * Возвращает список товаров с нужными полями.
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
 * Возвращает товары из кэша или загружает новые, если кэш пуст.
 */
export async function getProductsData() {
   const cached = getCache<any[]>(CACHE_KEY);
   if (cached) {
      // console.log("✅ Используются данные из кэша");
      return cached;
   }

   // console.log("🔄 Кэш пуст — загружаем данные с Ozon...");
   const products = await fetchProductsFromOzon();
   setCache(CACHE_KEY, products);
   // console.log("✅ Данные загружены и закэшированы на 24 часа");

   return products;
}

/**
 * Загружает данные при старте сервера и настраивает автообновление каждые 24 часа.
 */
export async function initializeProductCache() {
   try {
      // console.log("🚀 Инициализация кэша товаров при старте сервера...");
      const products = await fetchProductsFromOzon();
      setCache(CACHE_KEY, products);
      // console.log("✅ Кэш товаров успешно создан");

      // Автоматическое обновление каждые 24 часа
      setInterval(async () => {
         try {
            // console.log("♻️ Обновление данных товаров...");
            const updated = await fetchProductsFromOzon();
            setCache(CACHE_KEY, updated);
            // console.log("✅ Кэш товаров обновлён на следующие 24 часа");
         } catch (err) {
            // console.error("⚠️ Ошибка при обновлении данных с OZON:", err);
            console.error("⚠️ ERROR:  initializeProductCache OZON data update:", err);
         }
      }, REFRESH_INTERVAL);
   } catch (err) {
      // console.error("❌ Ошибка при инициализации кэша товаров:", err);
      console.error("❌ ERROR: initializeProductCache product cache initialization", err);
   }
}
