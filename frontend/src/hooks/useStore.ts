import { User } from '@/types/User'
import { create } from 'zustand'

const useUserStore = create<{ user: User }>((set) => ({
    user: {
        data: {
            name: 'name',
            email: 'email',
        },
        hasAuth: false
    },
    setUser: (userData: User['data']) => set((state) => ({ user: { ...state.user, ...{ data: userData } } })),
}))

export default useUserStore