import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pizza } from '../../types'
import { RootState } from '../store'

export type ItemsType = {
  id: number
  imageUrl: string
  title: string
  price: number
  rating: number
  category: number
  sizes: number
  types: number
  count: number
}
interface CartStateType {
  totalPrice: number
  items: ItemsType[]
}
const initialState: CartStateType = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem(state, action: PayloadAction<ItemsType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    minusItem(state, action: PayloadAction<ItemsType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)

      if (findItem?.count) {
        findItem.count--
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    removeItem(state, action: PayloadAction<number>) {
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

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: ItemsType['id']) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id)

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions

export default cartSlice.reducer
