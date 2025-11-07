import { Router, Request, Response } from "express";
import { getProductIdentifiers, getProductPrices, getProducts } from "../services/utils";
import NodeCache from "node-cache";

const router = Router();
const cache = new NodeCache({ stdTTL: 60 * 60 * 3 });

async function getProductsData() {
   const listOfProductIdentifiers = await getProductIdentifiers();

   const listOfProducts = await Promise.all(
      listOfProductIdentifiers.map(async (item) => {
         const productDetails = await getProducts(item.product_id);
         return {
            ...item,
            name: productDetails.items[0].name,
            sku: productDetails.items[0].sku,
            has_stock: productDetails.items[0].stocks.has_stock,
            created_at: productDetails.items[0].created_at,
            primary_image: productDetails.items[0].primary_image,
            images: productDetails.items[0].images,
         };
      })
   );

   const listOfProducts_full = await Promise.all(
      listOfProducts.map(async (item) => {
         const productPrice_temp = await getProductPrices(item.product_id);
         return {
            ...item,
            price:
               productPrice_temp.items[0].price.min_price -
               productPrice_temp.items[0].price.net_price,
         };
      })
   );

   return listOfProducts_full.filter(
      (item) => item.has_stock && item.price > 0
   );
}

router.get("/", async (_req: Request, res: Response) => {
   try {
      const cacheKey = "products";

      const cachedData = cache.get(cacheKey);
      if (cachedData) {
         console.log("Node-cache data");
         return res.json(cachedData);
      }

      console.log("Cache is empty, loading data...");
      const result = await getProductsData();

      cache.set(cacheKey, result);
      console.log("Data is cached for 3 hours");

      res.json(result);
   } catch (err: any) {
      console.error("Ozon API error - get call:", err);
      res.status(500).json({ error: err.message });
   }
});

export default router;