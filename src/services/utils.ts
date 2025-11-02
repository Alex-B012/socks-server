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

      console.log("products_data", products_data)


      if (Array.isArray(products_data)) {
         const result = products_data.map(({ product_id, offer_id }) => ({ product_id, offer_id }));
         console.log("From Ozon:", result);
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

export const getProducts = async (product_id: number) => {
   try {
      const body = {
         product_id: [product_id],
      };


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
   } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
   }
};