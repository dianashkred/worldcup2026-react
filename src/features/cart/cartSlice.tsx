import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "../store";
import { MAX_PER_CATEGORY, MAX_PER_MATCH } from "../../constants/tickets";

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

const initialState: CartState = { items: [], lastExceeded: null };

const keyEq = (
  a: { matchId: number; category: string | CartCategory },
  b: { matchId: number; category: string }
) => a.matchId === b.matchId && String(a.category) === String(b.category);

const totalForMatch = (
  items: CartItem[],
  matchId: number,
  excludeKey?: { matchId: number; category: string }
) =>
  items.reduce((sum, it) => {
    if (it.matchId !== matchId) return sum;
    if (
      excludeKey &&
      it.matchId === excludeKey.matchId &&
      String(it.category) === String(excludeKey.category)
    ) {
      return sum;
    }
    return sum + it.quantity;
  }, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
      state.lastExceeded = null;
    },
    removeTicket(state, action: PayloadAction<{ matchId: number; category: string }>) {
      state.items = state.items.filter((it) => !keyEq(it, action.payload));
    },
    updateQuantity(
      state,
      action: PayloadAction<{ matchId: number; category: string; quantity: number }>
    ) {
      const it = state.items.find((x) => keyEq(x, action.payload));
      if (!it) return;

      const takenByOthers = totalForMatch(state.items, action.payload.matchId, action.payload);
      const allowedByMatch = Math.max(0, MAX_PER_MATCH - takenByOthers);
      const hardCap = Math.min(MAX_PER_CATEGORY, allowedByMatch);

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
      const takenByOthers = totalForMatch(state.items, matchId, { matchId, category });
      const remainingByMatch = Math.max(0, MAX_PER_MATCH - takenByOthers);

      const toAdd = Math.max(0, Math.min(qty, remainingByCategory, remainingByMatch));

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
