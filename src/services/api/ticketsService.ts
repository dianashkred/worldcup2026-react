import type { CartItem } from "../../features/cart/cartSlice";
import type { Ticket } from "../../Types/Ticket";

const BASE_URL = "https://worldcup2026.shrp.dev";

function authHeaders(json: boolean): HeadersInit {
  const h: Record<string, string> = {};
  if (json) h["Content-Type"] = "application/json";
  return h;
}

// НОРМАЛЬНОЕ ЧТЕНИЕ ОШИБОК
async function readError(res: Response, defaultMsg: string): Promise<never> {
  try {
    const text = await res.text();

    // Попробуем JSON
    try {
      const json = JSON.parse(text);
      if (json.message) throw new Error(json.message);
      throw new Error(text);
    } catch {
      throw new Error(text || `${defaultMsg} (HTTP ${res.status})`);
    }
  } catch {
    throw new Error(defaultMsg);
  }
}

// -------------------------
// 1) Add pending tickets
// -------------------------
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

// -------------------------
// 2) Pay pending
// -------------------------
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

// -------------------------
// 3) Load all tickets
// -------------------------
export async function getAllTickets(): Promise<Ticket[]> {
  const res = await fetch(`${BASE_URL}/tickets`, {
    method: "GET",
    credentials: "include",
    headers: authHeaders(false),
  });

  if (!res.ok) return readError(res, "Failed to fetch tickets");

  const data = await res.json();
  return data.data?.tickets ?? [];
}

// -------------------------
// 4) Checkout
// -------------------------
export async function checkoutCartViaApi(items: CartItem[]): Promise<Ticket[]> {
  if (!items.length) return [];

  // Сначала добавляем pending
  for (const item of items) {
    await addTicketToCart(item.matchId, String(item.category), item.quantity);
  }

  // Потом подтверждаем (оплачиваем)
  const paid = await payPendingTickets();

  if (!paid || !paid.tickets) return [];

  return paid.tickets;
}
