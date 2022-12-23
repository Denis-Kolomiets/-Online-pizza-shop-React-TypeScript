import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type InitialStateType = {
  activeCategori: number
  sort: string
  search: string
}
const initialState: InitialStateType = {
  activeCategori: 0,
  sort: 'rating',
  search: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    SetActiveCategori(state, action: PayloadAction<number>) {
      state.activeCategori = action.payload
    },
    SetSort(state, action: PayloadAction<string>) {
      state.sort = action.payload
    },
    SetSearchValue(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setFilters(state, action) {
      state.activeCategori = Number(action.payload.activeCategori)
      state.sort = action.payload.sort
    },
  },
})

export const { SetSearchValue, SetSort, SetActiveCategori, setFilters } =
  filterSlice.actions

export default filterSlice.reducer
