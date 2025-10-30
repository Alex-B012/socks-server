import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const {
   OZON_CLIENT_ID,
   OZON_API_KEY,
   OZON_BASE_URL,
} = process.env;

// interface OzonProduct {
//    id: number;
//    name: string;
//    price: number;
//    quantity: number;
// }

interface OzonApiResponse<T> {
   result: T;
   success: boolean;
   error?: string;
}


export async function callOzonApi<T>(
   endpoint: string,
   params: Record<string, any> = {}
): Promise<OzonApiResponse<T>> {

   try {
      const headers = {
         "Client-Id": OZON_CLIENT_ID as string,
         "Api-Key": OZON_API_KEY as string,
         "Content-Type": "application/json",
      };

      const { data } = await axios.post<OzonApiResponse<T>>(
         `${OZON_BASE_URL}${endpoint}`,
         params,
         { headers }
      );

      return data;
   } catch (error: any) {
      console.error("Ozon API error:", error.response?.data || error.message);

      throw new Error(error.response?.data?.message || "Ozon API request failed");
   }
}
