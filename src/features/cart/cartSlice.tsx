import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction }  from "@reduxjs/toolkit";
import { getPendingTickets, addTicketToCart } from "../../services/api/ticketsService";
import type { CategoryApi } from "../../Types/Match";

interface CartState {
  count: number;
}

const initialState: CartState = {
  count: 0,
};

export const fetchPendingTickets = createAsyncThunk("cart/fetchPendingTickets", async () => {
  const data = await getPendingTickets();
  return data.count;
});

export const addTicketAndRefresh = createAsyncThunk(
  "cart/addTicketAndRefresh",
  async (
    { matchId, category, quantity }: { matchId: number; category: CategoryApi; quantity: number },
    { dispatch }
  ) => {
    await addTicketToCart(matchId, category, quantity);
    const updated = await getPendingTickets();
    dispatch(setCartCount(updated.count));
    return updated.count;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingTickets.fulfilled, (state, action) => {
        state.count = action.payload;
      })
      .addCase(addTicketAndRefresh.fulfilled, (state, action) => {
        state.count = action.payload;
      });
  },
});

export const { setCartCount } = cartSlice.actions;
export default cartSlice.reducer;
