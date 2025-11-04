import axios from "axios";
import { callOzonApi } from "./ozonApi";

interface Product {
   product_id: number;
   offer_id: number;

}

export const getProductIdentifiers = async (): Promise<Product[]> => {
   const body = {
      filter: {
         visibility: "ALL"
      },
      last_id: "",
      limit: 100,
   };

   try {
      const products_data_temp = await callOzonApi<any>("/v3/product/list", body);
      const products_data = products_data_temp.result.items;

      if (Array.isArray(products_data)) {
         const result = products_data.map(({ product_id, offer_id }) => ({ product_id, offer_id }));

         return result;
      } else {
         throw new Error("API response is not an array");
      }
   } catch (error) {
      console.error("Error fetching product identifiers:", error);
      throw error;
   }
};


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async (product_id: number): Promise<any> => {
   const body = {
      product_id: [product_id],
   };

   let retries = 5;
   let delayTime = 1000;

   while (retries > 0) {
      try {
         const response = await axios.post(
            "https://api-seller.ozon.ru/v3/product/info/list",
            body,
            {
               headers: {
                  "Client-Id": process.env.OZON_CLIENT_ID!,
                  "Api-Key": process.env.OZON_API_KEY!,
                  "Content-Type": "application/json",
               },
            }
         );

         return response.data;
      } catch (error: any) {
         if (error.response && error.response.status === 429) {
            console.log(`Rate limit hit. Retrying in ${delayTime / 1000} seconds...`);


            const retryAfter = error.response.headers['retry-after'];
            if (retryAfter) {
               delayTime = parseInt(retryAfter) * 1000;
            }

            await delay(delayTime);
            retries--;


            delayTime *= 2;

            if (retries === 0) {
               console.error("Maximum retry attempts reached.");
               throw new Error("Maximum retry attempts reached.");
            }
         } else {
            console.error("Error fetching product details:", error);
            throw error;
         }
      }
   }
};

const delay2 = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProductPrices = async (product_id: number): Promise<any> => {
   const body = {
      filter: {
         product_id: [product_id],
      },
      limit: 100,
   }

   let retries = 5;
   let delayTime = 1000;

   while (retries > 0) {
      try {
         const response = await axios.post(
            "https://api-seller.ozon.ru/v5/product/info/prices",
            body,
            {
               headers: {
                  "Client-Id": process.env.OZON_CLIENT_ID!,
                  "Api-Key": process.env.OZON_API_KEY!,
                  "Content-Type": "application/json",
               },
            }
         );

         return response.data;
      } catch (error: any) {
         if (error.response && error.response.status === 429) {
            console.log(`Rate limit hit. Retrying in ${delayTime / 1000} seconds...`);

            const retryAfter = error.response.headers['retry-after'];
            if (retryAfter) delayTime = parseInt(retryAfter) * 1000;

            await delay2(delayTime);
            retries--;
            delayTime *= 2;

            if (retries === 0) {
               console.error("Maximum retry attempts reached.");
               throw new Error("Maximum retry attempts reached.");
            }
         } else {
            console.error("Error fetching product details:", error);
            throw error;
         }
      }
   }
};