import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (_, thunkAPI) => {
    const API =
      'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/36ad4e93-800e-451b-9831-ae6abe1b28ef/pizzas.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221220T061350Z&X-Amz-Expires=86400&X-Amz-Signature=a4509112c65b9fefc0fb0a44e5ea3b71fcfdcb3a787098b563973c26c48d884f&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22pizzas.json%22&x-id=GetObject'
    const res = await fetch(API)
    const data = await res.json()

    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Pizzas empty')
    }
    return thunkAPI.fulfillWithValue(data)
  }
)
const initialState = {
  items: [],
  status: '',
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loanding'
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'success'
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error'
        state.items = []
      })
  },
})

export const {} = pizzaSlice.actions

export default pizzaSlice.reducer
