import { Product } from "hooks/stores/useProductStor";

// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg"

const mockProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 99990,
    category: {
      id: 1,
      name: "Смартфоны",
      products: [],
    },
    type: {
      id: 101,
      name: "Флагман",
      products: ["iPhone 15 Pro", "Samsung Galaxy S23 Ultra"],
    },
    color: "Титан черный",
    description: "Флагманский смартфон с процессором A17 Pro и камерой 48 МП",
    image_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    number_of_purchases: 1245,
  },
  {
    id: 2,
    name: "MacBook Air M2",
    brand: "Apple",
    price: 109990,
    category: {
      id: 2,
      name: "Ноутбуки",
      products: [],
    },
    type: {
      id: 102,
      name: "Ультрабук",
      products: ["MacBook Air M2", "Dell XPS 13"],
    },
    color: "Серебристый",
    description: "Ультратонкий ноутбук с чипом Apple M2 и дисплеем Retina",
    image_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    number_of_purchases: 876,
  },
  {
    id: 3,
    name: "Galaxy Watch 6",
    brand: "Samsung",
    price: 29990,
    category: {
      id: 3,
      name: "Умные часы",
      products: [],
    },
    type: {
      id: 103,
      name: "Смарт-часы",
      products: ["Galaxy Watch 6", "Apple Watch Series 9"],
    },
    color: "Графитовый",
    description: "Умные часы с мониторингом здоровья и Wear OS",
    image_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    number_of_purchases: 1532,
  },
  {
    id: 4,
    name: "PlayStation 5",
    brand: "Sony",
    price: 59990,
    category: {
      id: 4,
      name: "Игровые консоли",
      products: [],
    },
    type: {
      id: 104,
      name: "Игровая приставка",
      products: ["PlayStation 5", "Xbox Series X"],
    },
    color: "Белый",
    description: "Игровая консоль нового поколения с SSD и 4K HDR",
    image_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    number_of_purchases: 3241,
  },
  {
    id: 5,
    name: "AirPods Pro 2",
    brand: "Apple",
    price: 24990,
    category: {
      id: 5,
      name: "Наушники",
      products: [],
    },
    type: {
      id: 105,
      name: "TWS-наушники",
      products: ["AirPods Pro 2", "Galaxy Buds2 Pro"],
    },
    color: "Белый",
    description: "Беспроводные наушники с активным шумоподавлением",
    image_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    number_of_purchases: 2876,
  },
];

export default mockProducts;
