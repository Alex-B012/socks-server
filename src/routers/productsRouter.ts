import { Router, Request, Response } from "express";
import { callOzonApi } from "../services/ozonApi";
import { products } from "../data/products";

const router = Router();

// GET all products
router.get("/", async (_req: Request, res: Response) => {

   try {
      const body = {
         filter: { visibility: "ALL" },
         last_id: "",
         limit: 100,
      };

      const result = await callOzonApi("/v3/product/list", body);

      res.json(result);
   } catch (err: any) {
      console.error("Ozon API error:", err.message);

      const redirect_error =
         err.message === "Client-Id and Api-Key headers are required";

      if (redirect_error) {
         console.log("Credential error occurred - products from data.ts are sent");
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

      const result = await callOzonApi("/v4/product/info", body);
      res.json(result);
   } catch (err: any) {

      const redirect_error =
         err.message === "Client-Id and Api-Key headers are required";

      if (redirect_error) {
         console.log("Credential error occurred - a product from data.ts are sent");
         const id = Number(req.params.id);
         return res.json(products.find((p) => p.sku === id));
      }

      res.status(500).json({ error: err.message });
   }
});

export default router;
