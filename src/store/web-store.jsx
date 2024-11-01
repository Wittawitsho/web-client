import { create } from 'zustand'
import axios from 'axios';
import { persist, createJSONStorage } from 'zustand/middleware'
import { listConcert, listAllConcert, searchFilters,getSuggestConcert } from '../api/Concert';
// import { toast } from 'react-toastify';
import _ from 'lodash'
const webStore = (set, get) => ({
  user: null,
  token: null,
  concerts: [],
  carts: [],
  suggestConcerts:[],
  concertsAll:[],
  actionAddtoCart: (product) => {

    const carts = get().carts
    const updateCart = [...carts, { ...product, count: 1 }]

    const uniqe = _.unionWith(updateCart, _.isEqual)

    set({ carts: uniqe })

  },
  actionUpdateQuantity: (productId, newQuantity) => {
    console.log('Update', productId, newQuantity)
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item

      )
    }))
  },
  actionRemoveProduct: (productId) => {
    console.log('removeeeeee', productId)
    set((state) => ({
      carts: state.carts.filter((item) =>
        item.id !== productId
      )
    }))
  },
  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count
    }, 0)
  },
  actionLogin: async (form) => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', form)
      set({
        user: res.data.payload,
        token: res.data.token
      })
      return res
    } catch (err) {
      // const errMsg = err.response?.data?.message
      // toast.error(errMsg)
      console.log(err)
    }
  },
  getConcert: async (count) => {
    try {
      const res = await listConcert(count)
      set({ concerts: res.data })
    } catch (err) {
      console.log(err)
    }
  },
  getSuggestConcert: async (count) => {
    try {
      const res = await getSuggestConcert(count)
      set({ suggestConcerts: res.data })
    } catch (err) {
      console.log(err)
    }
  },
  getAllConcert: async () => {
    try {
      const res = await listAllConcert()
      set({ concertsAll: res.data })
    } catch (err) {
      console.log(err)
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg)
      set({ concerts: res.data })
    } catch (err) {
      console.log(err)
    }
  },
  actionLogout: () => {
    set({
      user: null,
      token: null,
      carts: [], // Optional: Clear the cart on logout
    });
    localStorage.removeItem('web-store'); // Clear from persisted storage
    window.location.href = '/'; // Redirect to login or home page
  },
})


const usePersist = {
  name: 'web-store',
  Storage: createJSONStorage(() => localStorage)
}

const useWebStore = create(persist(webStore, usePersist))

export default useWebStore