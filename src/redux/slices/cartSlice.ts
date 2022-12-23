import { createSlice } from '@reduxjs/toolkit'
import { Pizza } from '../../types'

type ItemsType = {
  id: number
  imageUrl: string
  title: string
  price: number
  rating: number
  category: number
  sizes: Array<number>
  types: Array<number>
  count: number
}
type InitialStateType = {
  totalPrice: number
  items: ItemsType[]
}
const initialState: InitialStateType = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = state.items.reduce((sum: number, obj: ItemsType) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)

      if (findItem?.count) {
        findItem.count--
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    clearItem(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const selectCart = (state: any) => state.cart
export const selectCartItemById = (id: ItemsType['id']) => (state: any) =>
  state.cart.items.find((obj: ItemsType) => obj.id === id)

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions

export default cartSlice.reducer
