import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import productsRouter from "./routers/productsRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const {
   OZON_CLIENT_ID,
   OZON_API_KEY,
   PORT,
} = process.env;

if (!OZON_CLIENT_ID || !OZON_API_KEY) {
   console.warn("Warning: Missing Ozon credentials in .env — running in mock mode");
   // do not exit; allow local/mock routes to function
}

const port = Number(PORT) || 3030;

app.use("/", productsRouter);

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});
