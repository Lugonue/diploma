import { Product } from "hooks/stores/useProductStor";

export type ProductAPIResponse = {
  data: Product[];
  lastPage: number;
  page: string;
  total: number;
};
