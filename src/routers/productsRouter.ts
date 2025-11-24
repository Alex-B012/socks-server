import { Router, Request, Response } from "express";
import { getProductsData } from "../services/productsService";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
   // console.log("GET request from a user")
   try {
      const products = await getProductsData();
      res.json(products);
   } catch (err: any) {
      console.error("ERROR: Failed to get products:", err);
      res.status(500).json({ error: err.message });
   }
});

export default router; 
