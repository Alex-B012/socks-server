export enum BrandName {
   AMIGOBS = "AMIGOBS",
}

export enum Color {
   oreo = "Орео",
   fanta = "Фанта",
   pepsi = "Пепси",
   mars = "Марс",
   nutella = "Нутелла",
   kit_kat = "Кит-Кат",
   bounty = "Баунти",
   snickers = "Сникерс",
   m_ms = "M&Ms",
   hobby = "hobby",
   multicolor = "Разноцветный",
   new_year_red = "Новогодний красный",
}

export enum Category {
   socks = "socks",
}

export enum ClientCategory {
   female = "female",
   male = "male",
}

export enum Size {
   RU_30_35 = "30-35 RU",
   RU_36_41 = "36-41 RU",
}

export enum NewItem {
   yes = "Новинка",
   no = "",
}

export enum Season {
   all = "На любой сезон",
   winter = "Зима",
}

export enum MaterialName {
   polyester = "Полиэстер",
   spandex = "Спандекс",
   cotton = "Хлопок",
   lycra = "Лайкра",
   polyamide = "Полиамид",
}

export enum Collection {
   basic = "Базовая коллекция",
}

export enum Style {
   casual = "Повседневный",
   evening_festive = "Вечерний/Праздничный",
}

interface Material {
   name: MaterialName;
   percentage: number;
}

interface Price {
   price: number;
   price_discount: number;
}

interface About {
   season: Season[];
   material: Material[];
   collection: Collection;
   style: Style;
}

export interface Product {
   id: number;
   sku: number;
   date_added: string;
   name: string;
   brand_name: BrandName;
   socks_colors: Color[];
   category: Category;
   client_category: ClientCategory;
   rating: number;
   size: Size[];
   url_ozon: string;
   newItem: NewItem;
   salesUntil: string;
   sellout_days: number;
   items_left: number;
   price: Price;
   about: About;
}