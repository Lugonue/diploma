import { Category } from "hooks/stores/useCatalogStore";

const mockCategories: Category[] = [
  {
    id: 1,
    name: "Category 1",
    products: [],
    types: [],
  },
  {
    id: 2,
    name: "Category 2",
    products: [],
    types: [],
  },
  {
    id: 3,
    name: "Category 3",
    products: [],
    types: [],
  },
  {
    id: 4,
    name: "Category 4",
    products: [],
    types: [],
  },
];

export const catalogPreviewItems = [
  {
    name: "стельки",
    desctiptions: "описание",
    img: "https://via.placeholder.com/150",
  },
  {
    name: "бандажи",
    desctiptions: "описание",
    img: "https://via.placeholder.com/150",
  },
  {
    name: "корректоры",
    desctiptions: "описание",
    img: "https://via.placeholder.com/150",
  },
  {
    name: "подушки",
    desctiptions: "описание",
    img: "https://www.belashoff.ru/image/cache/catalog/products/TC/tc-podushka-polu-puh-1000x1000.jpg",
  },
];

export default mockCategories;
