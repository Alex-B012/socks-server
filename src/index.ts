import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productsRouter from "./routers/productsRouter";
import { initializeProductCache } from "./services/productsService";

dotenv.config();

const app = express();
const website_url = process.env.WEBSITE_URL;

app.use(express.json());

const allowedOrigins = [
   website_url,
].filter(Boolean);

app.use(cors({
   origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
         callback(null, true);
      } else {
         console.warn(`Blocked by CORS: ${origin}`);
         callback(new Error("Not allowed by CORS"));
      }
   },
   methods: ["GET", "OPTIONS"],
   allowedHeaders: ["Content-Type"],
}));

const {
   OZON_CLIENT_ID,
   OZON_API_KEY,
   PORT,
} = process.env;

if (!OZON_CLIENT_ID || !OZON_API_KEY) {
   console.warn("Warning: Missing Ozon credentials in .env — running in mock mode");
}

app.use("/api/products", productsRouter);

const port = Number(PORT) || 3000;
app.listen(port, "0.0.0.0", async () => {
   console.log(`Server running at http://localhost:${port}`);
   await initializeProductCache();
});

