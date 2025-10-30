import { Router, Request, Response } from "express";
import { callOzonApi } from "../services/ozonApi";
import { products } from "../data/products";

const router = Router();

// GET all products
router.get("/", async (_req: Request, res: Response) => {
   try {
      const body = {
         filter: {

            visibility: "ALL"
         },
         last_id: "",
         limit: 100,

      };

      const result = await callOzonApi<any>("/v3/product/list", body);

      console.log("From Ozon:", result);
      res.json(result);
   } catch (err: any) {
      console.error("Ozon API error - get call:", err);
      console.error("Ozon API error message - get call:", err.message);

      const redirect_error = err.message === "Client-Id and Api-Key headers are required";

      if (redirect_error) {
         console.log("Credential error occurred - returning fake data");
         return res.json(products);
      }

      res.status(500).json({ error: err.message });
   }
});

// GET product by ID
router.get("/:id", async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const body = {
         offer_id: id,
         product_id: 0,
      };

      const result = await callOzonApi<any>("/v4/product/info", body);
      res.json(result);
   } catch (err: any) {
      const redirect_error = err.message === "Client-Id and Api-Key headers are required";

      if (redirect_error) {
         console.log("Credential error occurred - returning product data from fake data source");
         const product = products.find((p) => p.sku === Number(id));
         if (!product) {
            return res.status(404).json({ error: "Product not found" });
         }
         return res.json(product);
      }

      res.status(500).json({ error: err.message });
   }
});

export default router;
