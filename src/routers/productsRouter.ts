import { Router, Request, Response } from "express";
import { getProductIdentifiers, getProductPrices, getProducts } from "../services/utils";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
   try {
      console.log("request - api/products");
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
               price: productPrice_temp.items[0].price.min_price - productPrice_temp.items[0].price.net_price,
            };
         })
      );

      const result = listOfProducts_full.filter(item => item.has_stock && item.price > 0);

      res.json(result);

   } catch (err: any) {
      console.error("Ozon API error - get call:", err);
      res.status(500).json({ error: err.message });
   }
});

export default router;