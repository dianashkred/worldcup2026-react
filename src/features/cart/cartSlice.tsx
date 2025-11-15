import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "../store";
import { MAX_PER_CATEGORY, MAX_GLOBAL } from "../../constants/tickets";

export type CartCategory = "VIP" | "CATEGORY_1" | "CATEGORY_2" | "CATEGORY_3";

export type MatchSummary = {
  date: string;
  homeTeam?: { name: string; flagImagePath?: string; group?: { name?: string } | null } | null;
  awayTeam?: { name: string; flagImagePath?: string } | null;
  stadium?: { name: string; city: string; countryCode: string } | null;
};

export type CartItem = {
  matchId: number;
  category: CartCategory | string;
  price: number;
  quantity: number;
  match?: MatchSummary | null;
};

type CartState = {
  items: CartItem[];
  lastExceeded?: { matchId: number; category: string } | null;
};

const storedItems = localStorage.getItem('cart_items');
const initialState: CartState = {
  items: storedItems ? JSON.parse(storedItems) : [],
  lastExceeded: null,
};

const saveToLocalStorage = (items: CartItem[]) => {
  localStorage.setItem('cart_items', JSON.stringify(items));
};

const keyEq = (
  a: { matchId: number; category: string | CartCategory },
  b: { matchId: number; category: string }
) => a.matchId === b.matchId && String(a.category) === String(b.category);



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
      state.lastExceeded = null;
      saveToLocalStorage(state.items);

    },
    removeTicket(state, action: PayloadAction<{ matchId: number; category: string }>) {
      state.items = state.items.filter((it) => !keyEq(it, action.payload));
      saveToLocalStorage(state.items);

    },
    updateQuantity(
      state,
      action: PayloadAction<{ matchId: number; category: string; quantity: number }>
      
    ) {
      const it = state.items.find((x) => keyEq(x, action.payload));
      if (!it) return;


      const totalWithoutThis = state.items.reduce((sum, it) =>
        it.matchId === action.payload.matchId &&
        it.category === action.payload.category
          ? sum
          : sum + it.quantity,
        0
      );

      const remainingGlobal = Math.max(0, MAX_GLOBAL - totalWithoutThis);

      const hardCap = Math.min(MAX_PER_CATEGORY, remainingGlobal);


      const desired = action.payload.quantity;
      const clamped = Math.max(0, Math.min(desired, hardCap));

      it.quantity = clamped;

      if (clamped === 0) {
        state.items = state.items.filter((x) => !keyEq(x, action.payload));
      }

      state.lastExceeded =
        desired > hardCap
          ? { matchId: action.payload.matchId, category: action.payload.category }
          : null;
      saveToLocalStorage(state.items);

    },
    addOrIncrease(
      state,
      action: PayloadAction<{
        matchId: number;
        category: string;
        price: number;
        qty: number;
        match?: MatchSummary | null;
      }>
    ) {
      const { matchId, category, price, qty, match } = action.payload;
      const existing = state.items.find((x) => keyEq(x, { matchId, category }));
      const prev = existing?.quantity ?? 0;

      const remainingByCategory = Math.max(0, MAX_PER_CATEGORY - prev);
      
      const totalInCart = state.items.reduce((s, it) => s + it.quantity, 0);
      const remainingGlobal = Math.max(0, MAX_GLOBAL - totalInCart);

      const toAdd = Math.max(
        0,
        Math.min(qty, remainingByCategory, remainingGlobal)
      );

      if (toAdd <= 0) {
        state.lastExceeded = { matchId, category };
        return;
      }

      if (existing) {
        existing.quantity += toAdd;
        existing.price = price;
        if (match !== undefined) existing.match = match;
      } else {
        state.items.push({ matchId, category, price, quantity: toAdd, match: match ?? null });
      }
      state.lastExceeded = null;
      saveToLocalStorage(state.items);

    },
  },
});

export const { clearCart, removeTicket, updateQuantity } = cartSlice.actions;

export const addTicketWithMatchData =
  (matchId: number, category: string, qty: number, price: number, match?: MatchSummary | null) =>
  (dispatch: AppDispatch) => {
    dispatch(
      cartSlice.actions.addOrIncrease({
        matchId,
        category,
        qty,
        price,
        match: match ?? null,
      })
    );
  };

export const selectCartTickets = (state: RootState): CartItem[] => state.cart.items;
export const selectCartTotal = (state: RootState): number =>
  state.cart.items.reduce((sum, it) => sum + it.price * it.quantity, 0);
export const selectCartCount = (state: RootState): number =>
  state.cart.items.reduce((s, it) => s + it.quantity, 0);

export const selectCountByMatch = (state: RootState, matchId: number): number =>
  state.cart.items.reduce((s, it) => (it.matchId === matchId ? s + it.quantity : s), 0);

export const selectLastExceeded = (state: RootState) => state.cart.lastExceeded;

export default cartSlice.reducer;
