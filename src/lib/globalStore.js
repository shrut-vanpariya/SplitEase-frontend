import { create } from 'zustand'


export const useStore = create((set) => ({
    globalLoading: false,
    setGlobalLoading: (loadingState) => set((state) => ({ globalLoading: loadingState })),
    user: null,
    setUser: (user) => set((state) => ({ user: user })),
    friends: [],
    setFriends: (friends) => set((state) => ({ friends: friends })),
    transactions: [],
    setTransactions: (transactions) => set((state) => ({ transactions: transactions })),
}))