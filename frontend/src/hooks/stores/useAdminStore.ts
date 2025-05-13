import adminApi from "@/api/endpoints/adminApi";
import { UserData } from "@/types/User";
import { create } from "zustand";

type BC = {
  link: string;
  name: string;
};
type Store = {
  users?: UserData[];
  fetchUsers: (u: UserData[]) => Promise<void>;
};

const useAdminStore = create<Store>((set) => ({
  BCitems: [],
  fetchUsers: async (users) => {
    if (users.length) return;
    const { data } = await adminApi.getAllUsers();
    set((state) => ({ ...state, users: data }));
  },
}));
export default useAdminStore;
