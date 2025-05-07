import auth from "@/api/endpoints/auth";
import { User } from "@/types/User";
import { create } from "zustand";

type Store = {
  user: User;
  userForm: Partial<User["data"]>;
  setUser: (data?: User["data"]) => void;
  setUserForm: (data: Partial<User["data"]>) => void;
  resetUserForm: () => void;
  logout: () => void;
};

const useUserStore = create<Store>((set) => ({
  user: {
    data: null,
    hasAuth: localStorage.getItem("authToken") ? true : false,
  },
  userForm: {},
  setUser: async (userData) => {
    if (!userData) {
      const { data } = await auth.getMe();
      userData = data;
    }
    console.log(userData);
    set((state) => ({
      ...state,
      user: { ...state.user, ...{ data: userData } },
    }));
  },
  setUserForm: async (data) => {
    set((state) => ({ ...state, userForm: { ...state.userForm, ...data } }));
  },
  resetUserForm: async () => {
    set((state) => ({ ...state, userForm: {} }));
  },
  logout: async () => {
    localStorage.removeItem("authToken");
    set((state) => ({
      ...state,
      user: { ...state.user, ...{ hasAuth: false } },
    }));
  },
}));
export default useUserStore;
