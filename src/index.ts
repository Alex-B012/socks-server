import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productsRouter from "./routers/productsRouter";

dotenv.config();

const app = express();
const localhost = process.env.LOCALHOST;
const website_url = process.env.WEBSITE_URL;

app.use(express.json());

const corsOptions: cors.CorsOptions = {
   origin: (origin: string | undefined, callback: (err: Error | null, allow: boolean) => void) => {
      if ([localhost, website_url].includes(origin || '')) {
         callback(null, true);
      } else {
         callback(new Error('Not allowed by CORS'), false);
      }
   },
   methods: 'GET',
   allowedHeaders: 'Content-Type',
   credentials: false,
};

app.use(cors(corsOptions));

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
