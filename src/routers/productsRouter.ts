import { Router, Request, Response } from "express";
// import { callOzonApi } from "../services/ozonApi";
// import { products } from "../data/products";
import axios from "axios";
import { getProductIdentifiers, getProducts } from "../services/utils";

const router = Router();

// GET product by ID
// router.get("/", async (_req: Request, res: Response) => {
//    try {
//       const body = {
//          filter: {
//             visibility: "ALL"
//          },
//          last_id: "",
//          limit: 100,
//       };

//       const result = await callOzonApi<any>("/v3/product/list", body);

//       console.log("From Ozon:", result);
//       res.json(result);
//    } catch (err: any) {
//       console.error("Ozon API error - get call:", err);
//       console.error("Ozon API error message - get call:", err.message);

//       const redirect_error = err.message === "Client-Id and Api-Key headers are required";

//       if (redirect_error) {
//          console.log("Credential error occurred - returning fake data");
//          return res.json(products);
//       }

//       res.status(500).json({ error: err.message });
//    }
// });

router.get("/", async (_req: Request, res: Response) => {
   try {

      const listOfProductIdentifiers = await getProductIdentifiers();
      const listOfProducts = await Promise.all(
         listOfProductIdentifiers.map(async (item) => {
            const productDetails = await getProducts(item.product_id);
            return {
               ...item,
               name: productDetails.items.name,
               sku: productDetails.items.sku,
               // has_stock: productDetails.items.stocks.has_stock,
               is_prepayment_allowed: productDetails.items.is_prepayment_allowed,
               created_at: productDetails.items.created_at,
               primary_image: productDetails.items.primary_image,
               images: productDetails.items.images
            };
         })
      );

      console.log("List of Products with Details:", listOfProducts);

      res.json(listOfProducts);

   } catch (err: any) {
      console.error("Ozon API error - get call:", err);
      res.status(500).json({ error: err.message });
   }
});

export default router;


// Формируем тело запроса, как требует Ozon
// const body = {
//    filter: {
//       product_id: [product_id],
//       visibility: "ALL",
//    },
//    limit: 100,
//    sort_dir: "ASC",
// };