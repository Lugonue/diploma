import { create } from "zustand";

type BC = {
  link: string;
  name: string;
};
type Store = {
  BCitems: BC[];
  setBC: (items: BC[]) => void;
};

const useBCStore = create<Store>((set) => ({
  BCitems: [],
  setBC: async (items) => {
    set((state) => ({ BCitems: items }));
  },
}));
export default useBCStore;
