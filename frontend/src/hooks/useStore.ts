import auth from "@/api/endpoints/auth";
import { User } from "@/types/User";
import { create } from "zustand";

type Store = {
  user: User;
  setUser: () => void;
  logout: () => void;
};

const useUserStore = create<Store>((set) => ({
  user: {
    data: null as User["data"] | null,
    hasAuth: localStorage.getItem("authToken") ? true : false,
  },
  setUser: async () => {
    const { data } = await auth.getMe();
    set((state) => ({ user: { ...state.user, ...{ data } } }));
  },
  logout: async () => {
    localStorage.removeItem("authToken");
    set((state) => ({ user: { ...state.user, ...{ hasAuth: false } } }));
  },
}));
export default useUserStore;
