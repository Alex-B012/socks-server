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
   origin: (origin, callback) => {
      const allowedOrigins = [localhost, website_url].filter(Boolean);
      if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
      } else {
         console.warn(`CORS blocked request from origin: ${origin}`);
         callback(new Error('Not allowed by CORS'));
      }
   },
   methods: ['GET', 'OPTIONS'],
   allowedHeaders: ['Content-Type'],
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
app.get("/test", (req, res) => {
   res.json({ message: "CORS OK" });
});

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});
