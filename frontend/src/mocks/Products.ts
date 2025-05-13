import { Product } from "hooks/stores/useProductStor";
import mockCategories from "./Categories";

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

const mockOrthopedicProducts: Product[] = [
  {
    id: 1,
    name: "Ортопедическая подушка Memory Foam",
    brand: "OrthoComfort",
    price: 5990,
    category: mockCategories[1], // Предполагаем, что это категория "Спальные принадлежности"
    type: {
      id: 101,
      name: "Подушки",
      products: ["Memory Foam", "Шейная подушка", "Анатомическая подушка"],
    },
    color: "Белый",
    description: "Анатомическая подушка из пены с эффектом памяти для поддержки шеи и головы",
    image_url: "https://kachestvovpodarok.ru/img/244cae88-d707-4da0-90c1-bbd0a22169ae.jpg",
    number_of_purchases: 1245,
  },
  {
    id: 2,
    name: "Ортопедический матрас SpineCare",
    brand: "OrthoSleep",
    price: 45990,
    category: mockCategories[1], // "Спальные принадлежности"
    type: {
      id: 102,
      name: "Матрасы",
      products: ["SpineCare", "ProBack", "ComfortPlus"],
    },
    color: "Бежевый",
    description: "Матрас средней жесткости с независимыми пружинами и слоем латекса",
    image_url: "https://mnogosna.ru/upload/iblock/44d/30pcpqjozm23goiwauagtbec99zopius/thumbs/1x/Optima-premium-3.jpg",
    number_of_purchases: 876,
  },
  {
    id: 3,
    name: "Корректор осанки PostureMaster",
    brand: "OrthoCare",
    price: 3490,
    category: mockCategories[2], // Предполагаем "Корректоры осанки"
    type: {
      id: 103,
      name: "Корректоры осанки",
      products: ["PostureMaster", "SpineSupport", "BackBrace"],
    },
    color: "Черный",
    description: "Эластичный корректор осанки для повседневного использования",
    image_url: "https://orto-ved.ru/wa-data/public/shop/products/71/01/171/images/5282/korset-dlja-osanki-dlya-vzroslych-trives-t-54-01.970.jpg",
    number_of_purchases: 2532,
  },
  {
    id: 4,
    name: "Ортопедические стельки ComfortStep",
    brand: "FootRelief",
    price: 1990,
    category: mockCategories[3], // "Обувные аксессуары"
    type: {
      id: 104,
      name: "Стельки",
      products: ["ComfortStep", "ArchSupport", "GelInsoles"],
    },
    color: "Синий",
    description: "Анатомические стельки с супинатором для повседневной обуви",
    image_url: "https://sistema-z.ru/catalog/images/concept.jpg",
    number_of_purchases: 4241,
  },
  {
    id: 5,
    name: "Ортез коленного сустава KneeBrace Pro",
    brand: "OrthoSupport",
    price: 5490,
    category: mockCategories[4], // "Ортезы и бандажи"
    type: {
      id: 105,
      name: "Ортезы",
      products: ["KneeBrace Pro", "AnkleSupport", "WristStabilizer"],
    },
    color: "Серый",
    description: "Фиксатор коленного сустава с регулируемой степенью поддержки",
    image_url: "data:image/jpeg;base64,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",
    number_of_purchases: 1876,
  },
];

export default mockOrthopedicProducts;
