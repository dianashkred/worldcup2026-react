
import type { CartItem } from "../../features/cart/cartSlice";


const BASE_URL = "https://worldcup2026.shrp.dev";

function authHeaders(json: boolean): HeadersInit {
  const headers: Record<string, string> = {};
  if (json) headers["Content-Type"] = "application/json";
  return headers;
}

async function readError(res: Response, defaultMsg: string): Promise<never> {
  let text = "";
  try { text = await res.text(); } catch {
    // ignore errors
  }
  throw new Error(text || `${defaultMsg} (HTTP ${res.status})`);
}

export async function addTicketToCart(
  matchId: number,
  category: string,
  quantity: number
) {
  const res = await fetch(`${BASE_URL}/tickets`, {
    method: "POST",
    credentials: "include",
    headers: authHeaders(true),
    body: JSON.stringify({ matchId, category, quantity }),
  });

  if (!res.ok) return readError(res, "Failed to add ticket to cart");
  const data = await res.json();
  return data.data;
}

export async function getPendingTickets() {
  const res = await fetch(`${BASE_URL}/tickets/pending`, {
    method: "GET",
    credentials: "include",
    headers: authHeaders(false),
  });

  if (!res.ok) return readError(res, "Failed to fetch pending tickets");
  const data = await res.json();
  return data.data;
}

export async function payPendingTickets() {
  const res = await fetch(`${BASE_URL}/tickets/pay-pending`, {
    method: "POST",
    credentials: "include",
    headers: authHeaders(false),
  });

  if (!res.ok) return readError(res, "Failed to pay pending tickets");
  const data = await res.json();
  return data.data;
}

export async function getAllTickets() {
  const res = await fetch(`${BASE_URL}/tickets`, {
    method: "GET",
    credentials: "include",
    headers: authHeaders(false),
  });

  if (!res.ok) return readError(res, "Failed to fetch tickets");
  const data = await res.json();
  return data.data?.tickets || [];
}

export async function checkoutCartViaApi(items: CartItem[]) {
  for (const item of items) {
    await addTicketToCart(item.matchId, String(item.category), item.quantity);
  }
  const paid = await payPendingTickets();
  return paid.tickets;
}
