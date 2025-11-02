import { Router, Request, Response } from "express";
// import { callOzonApi } from "../services/ozonApi";
// import { products } from "../data/products";
import axios from "axios";
import { getProductIdentifiers, getProductPrices, getProducts } from "../services/utils";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
   try {

      const listOfProductIdentifiers = await getProductIdentifiers();
      const listOfProducts = await Promise.all(
         listOfProductIdentifiers.map(async (item) => {
            const productDetails = await getProducts(item.product_id);
            return {
               ...item,
               name: productDetails.items[0].name,
               sku: productDetails.items[0].sku,
               has_stock: productDetails.items[0].stocks.has_stock,
               is_prepayment_allowed: productDetails.items[0].is_prepayment_allowed,
               created_at: productDetails.items[0].created_at,
               primary_image: productDetails.items[0].primary_image,
               images: productDetails.items[0].images,
               // data: productDetails.items[0]
            };
         })
      );

      const listOfProducts_full = await Promise.all(
         listOfProducts.map(async (item) => {
            const productPrice_temp = await getProductPrices(item.product_id);
            return {
               ...item,
               min_price: productPrice_temp.items[0].price_indexes.external_index_data.min_price,
               price_index_value: productPrice_temp.items[0].price_indexes.external_index_data.price_index_value,
               // data: productPrice_temp.items[0]
            };
         })
      );

      // console.log("List of Products with Details:", listOfProducts);
      res.json(listOfProducts_full);

   } catch (err: any) {
      console.error("Ozon API error - get call:", err);
      res.status(500).json({ error: err.message });
   }
});

export default router;