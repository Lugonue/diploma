import { create } from "zustand";

export type Category = {
    id: number,
    name: string,
    products: any[];
    "types": CategoryType[]
}
export type CategoryType = {
    "id": number,
    "name": string,
    "category"?: string,
    products?: string[]
}
type Store = {
    state: {
        currentCategoryId: number | null,

    }
    categories: Category[] | null;
    setCategories: (items: Category[]) => void;
    setCurrentCategoryId: (id: number) => void;
};

const useCatalogStore = create<Store>((set) => ({
    state: {
        currentCategoryId: null
    },
    categories: null,
    setCategories: (items) => {
        set((state) => ({ ...state, categories: items }));
    },
    setCurrentCategoryId: async (id: number) => {
        set((stateGlobal) => ({
            ...stateGlobal, state: {
                ...stateGlobal.state,
                currentCategoryId: id
            },
        }));
    },
}));
export default useCatalogStore;
