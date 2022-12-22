import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeCategori: 0,
  sort: 'rating',
  search: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    SetActiveCategori(state, action) {
      state.activeCategori = action.payload
    },
    SetSort(state, action) {
      state.sort = action.payload
    },
    SetSearchValue(state, action) {
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
