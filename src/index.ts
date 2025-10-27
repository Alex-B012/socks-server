import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import { products } from "./data"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const {
   OZON_CLIENT_ID,
   OZON_API_KEY,
   OZON_BASE_URL = "https://api-seller.ozon.ru",
   PORT = 3000,
} = process.env;

if (!OZON_CLIENT_ID || !OZON_API_KEY) {
   console.error("Missing Ozon credentials in .env");
   process.exit(1);
}

// Helper: Call Ozon API
async function callOzonApi<T>(endpoint: string, body: Record<string, any>): Promise<T> {
   try {
      const headers = {
         "Client-Id": OZON_CLIENT_ID as string,
         "Api-Key": OZON_API_KEY as string,
         "Content-Type": "application/json",
      };

      const { data } = await axios.post<T>(`${OZON_BASE_URL}${endpoint}`, body, { headers });
      return data;
   } catch (error: any) {
      console.error("Ozon API error - callOzonApi:", error.response?.data || error.message);
      throw new Error(error.response?.data.message || "Ozon API request failed");
   }
}


app.get("/api/products", async (_req: Request, res: Response) => {
   try {
      const body = {
         filter: { visibility: "ALL" },
         last_id: "",
         limit: 100,
      };

      const result = await callOzonApi("/v2/product/list", body);
      res.json(result);
   } catch (err: any) {
      console.error("Ozon API error:", err.message);

      const redirect_error = err.message === 'Client-Id and Api-Key headers are required';

      if (redirect_error) {
         console.log("Redirect error occurred");


         // res.json(result);
         // res.status(500).json({ error: err.message });
         res.json(products);
      }


      res.status(500).json({ error: err.message });
   }
});

app.get("/api/products/:offerId", async (req: Request, res: Response) => {
   const { offerId } = req.params;

   try {
      const body = {
         offer_id: offerId,
         product_id: 0,
      };

      const result = await callOzonApi("/v4/product/info", body);
      res.json(result);
   } catch (err: any) {
      res.status(500).json({ error: err.message });
   }
});

app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
});
