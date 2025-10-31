import { Router, Request, Response } from "express";
// import { callOzonApi } from "../services/ozonApi";
// import { products } from "../data/products";
import axios from "axios";

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
      const product_id = "2812258860";

      if (!product_id) {
         return res.status(400).json({ error: "product_id is required" });
      }

      // Формируем тело запроса, как требует Ozon
      // const body = {
      //    filter: {
      //       product_id: [product_id],
      //       visibility: "ALL",
      //    },
      //    limit: 100,
      //    sort_dir: "ASC",
      // };

      const body = {
         product_id: [product_id],
      };

      const response = await axios.post(
         "https://api-seller.ozon.ru/v3/product/info/list",
         body,
         {
            headers: {
               "Client-Id": process.env.OZON_CLIENT_ID,
               "Api-Key": process.env.OZON_API_KEY,
               "Content-Type": "application/json",
            },
         }
      );

      console.log("From Ozon:", response.data);
      res.json(response.data);

   } catch (err: any) {
      console.error("Ozon API error - get call:", err);
      res.status(500).json({ error: err.message });
   }
});

export default router;
