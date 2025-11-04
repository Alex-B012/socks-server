import { Product, BrandName, Color, Category, ClientCategory, Size, Season, MaterialName, Collection, Style, NewItem, } from '../types/types_products';

export const products: Product[] = [
   {
      id: 1,
      sku: 1838873600,
      date_added: "2025-10-21",
      name: "Носки AMIGOBS Oreo, Nutella, Mars, Fanta, Pepsi, 10 пар",
      brand_name: BrandName.AMIGOBS,
      socks_colors: [Color.oreo, Color.fanta, Color.pepsi, Color.mars, Color.nutella],
      category: Category.socks,
      client_category: ClientCategory.female,
      rating: 4.9,
      size: [Size.RU_36_41],
      url_ozon: "https://ozon.ru/t/7ixKV4F",
      newItem: NewItem.no,
      salesUntil: "",
      sellout_days: 2,
      items_left: 698,
      price: {
         price: 573,
         price_discount: 526
      },
      about: {
         season: [Season.all],
         material: [
            { name: MaterialName.polyester, percentage: 3.5 },
            { name: MaterialName.spandex, percentage: 1.5 },
            { name: MaterialName.cotton, percentage: 95 }
         ],
         collection: Collection.basic,
         style: Style.casual
      },
   },
   {
      id: 2,
      sku: 1942557652,
      date_added: "2025-10-21",
      name: "Носки AMIGOBS, 10 пар",
      brand_name: BrandName.AMIGOBS,
      socks_colors: [Color.oreo, Color.fanta, Color.pepsi, Color.mars, Color.nutella, Color.kit_kat, Color.bounty, Color.snickers, Color.m_ms, Color.hobby],
      category: Category.socks,
      client_category: ClientCategory.female,
      rating: 4.9,
      size: [Size.RU_36_41],
      url_ozon: "https://ozon.ru/t/A0T7OZa",
      newItem: NewItem.no,
      salesUntil: "",
      sellout_days: 2,
      items_left: 104,
      price: {
         price: 612,
         price_discount: 561
      },
      about: {
         season: [Season.all],
         material: [
            { name: MaterialName.lycra, percentage: 2 },
            { name: MaterialName.polyamide, percentage: 8 },
            { name: MaterialName.cotton, percentage: 90 }
         ],
         collection: Collection.basic,
         style: Style.casual
      },
   },
   {
      id: 3,
      sku: 2889571184,
      date_added: "2025-10-21",
      name: "Носки AMIGOBS Новогодние подарки, 10 пар",
      brand_name: BrandName.AMIGOBS,
      socks_colors: [Color.multicolor],
      category: Category.socks,
      client_category: ClientCategory.female,
      rating: 5,
      size: [Size.RU_30_35],
      url_ozon: "https://ozon.ru/t/9wsCboe",
      newItem: NewItem.no,
      salesUntil: "",
      sellout_days: -1,
      items_left: -1,
      price: {
         price: 831,
         price_discount: 764
      },
      about: {
         season: [Season.all],
         material: [
            { name: MaterialName.spandex, percentage: 1.5 },
            { name: MaterialName.polyester, percentage: 3.5 },
            { name: MaterialName.cotton, percentage: 95 }
         ],
         collection: Collection.basic,
         style: Style.evening_festive
      },
   },
   {
      id: 4,
      sku: 1222385868,
      date_added: "2025-10-21",
      name: "Носки AMIGOBS Новогодние подарки, 10 пар",
      brand_name: BrandName.AMIGOBS,
      socks_colors: [Color.multicolor],
      category: Category.socks,
      client_category: ClientCategory.female,
      rating: 5,
      size: [Size.RU_36_41],
      url_ozon: "https://ozon.ru/t/A0T7OV2",
      newItem: NewItem.no,
      salesUntil: "",
      sellout_days: 2,
      items_left: -1,
      price: {
         price: 734,
         price_discount: 672
      },
      about: {
         season: [Season.all],
         material: [
            { name: MaterialName.spandex, percentage: 5 },
            { name: MaterialName.polyester, percentage: 15 },
            { name: MaterialName.cotton, percentage: 80 }
         ],
         collection: Collection.basic,
         style: Style.evening_festive,
      },
   },
   {
      id: 5,
      sku: 2923570180,
      date_added: "2025-10-21",
      name: "Носки AMIGOBS Новогодние подарки, 10 пар",
      brand_name: BrandName.AMIGOBS,
      socks_colors: [Color.multicolor],
      category: Category.socks,
      client_category: ClientCategory.female,
      rating: 5,
      size: [Size.RU_36_41],
      url_ozon: "https://ozon.ru/t/tkwHsf0",
      newItem: NewItem.no,
      salesUntil: "",
      sellout_days: 2,
      items_left: 519,
      price: {
         price: 701,
         price_discount: 642
      },
      about: {
         season: [Season.all],
         material: [
            { name: MaterialName.spandex, percentage: 5 },
            { name: MaterialName.polyester, percentage: 15 },
            { name: MaterialName.cotton, percentage: 80 }
         ],
         collection: Collection.basic,
         style: Style.evening_festive,
      },
   },
   {
      id: 6,
      sku: 2992694054,
      date_added: "2025-10-21",
      name: "Носки AMIGOBS Новогодние подарки, 5 пар",
      brand_name: BrandName.AMIGOBS,
      socks_colors: [Color.multicolor],
      category: Category.socks,
      client_category: ClientCategory.female,
      rating: 4.9,
      size: [Size.RU_36_41],
      url_ozon: "https://ozon.ru/t/jhsJgAI",
      newItem: NewItem.yes,
      salesUntil: "2025-12-31",
      sellout_days: -1,
      items_left: -1,
      price: {
         price: 1200,
         price_discount: -1
      },
      about: {
         season: [Season.winter],
         material: [
            { name: MaterialName.spandex, percentage: 5 },
            { name: MaterialName.polyester, percentage: 15 },
            { name: MaterialName.cotton, percentage: 80 }
         ],
         collection: Collection.basic,
         style: Style.evening_festive,
      },
   }, {
      id: 7,
      sku: 2883603702,
      date_added: "2025-10-23",
      name: "Носки AMIGOBS Новогодние подарки, 10 пар",
      brand_name: BrandName.AMIGOBS,
      socks_colors: [Color.new_year_red],
      category: Category.socks,
      client_category: ClientCategory.female,
      rating: 4.9,
      size: [Size.RU_36_41],
      url_ozon: "https://ozon.ru/t/QoFCJ90",
      newItem: NewItem.no,
      salesUntil: "",
      sellout_days: -1,
      items_left: 371,
      price: {
         price: 796,
         price_discount: 728
      },
      about: {
         season: [Season.all],
         material: [
            { name: MaterialName.spandex, percentage: 1.5 },
            { name: MaterialName.polyester, percentage: 3.5 },
            { name: MaterialName.cotton, percentage: 95 }
         ],
         collection: Collection.basic,
         style: Style.evening_festive,
      },
   }
]