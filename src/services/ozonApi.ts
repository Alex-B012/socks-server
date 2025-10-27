import axios from "axios";

const {
   OZON_CLIENT_ID,
   OZON_API_KEY,
   OZON_BASE_URL = "https://api-seller.ozon.ru",
} = process.env;

export async function callOzonApi<T>(
   endpoint: string,
   body: Record<string, any>
): Promise<T> {

   try {
      const headers = {
         "Client-Id": OZON_CLIENT_ID as string,
         "Api-Key": OZON_API_KEY as string,
         "Content-Type": "application/json",
      };

      const { data } = await axios.post<T>(
         `${OZON_BASE_URL}${endpoint}`,
         body,
         { headers }
      );

      return data;
   } catch (error: any) {

      console.error("Ozon API error:", error.response?.data || error.message);

      throw new Error(error.response?.data?.message || "Ozon API request failed");
   }
}
