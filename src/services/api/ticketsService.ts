import type { CartItem } from "../../features/cart/cartSlice";
import type { Ticket } from "../../Types/Ticket";

const BASE_URL = "https://worldcup2026.shrp.dev";

function authHeaders(json: boolean): HeadersInit {
  return json ? { "Content-Type": "application/json" } : {};
}


async function readError(res: Response, defaultMsg: string): Promise<never> {
  const text = await res.text();

  try {
    const json = JSON.parse(text);
    if (json.message) throw new Error(json.message);
    throw new Error(text || defaultMsg);
  } catch {
    throw new Error(text || defaultMsg);
  }
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

export async function paySingleTicket() {
  const res = await fetch(`${BASE_URL}/tickets/pay-pending`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) return readError(res, "Failed to pay this ticket");

  const data = await res.json();
  return data.data;
}



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



export async function checkoutCartViaApi(items: CartItem[]): Promise<Ticket[]> {
  if (!items.length) return [];

  const createdTickets: Ticket[] = [];

  for (const item of items) {
    const response = await addTicketToCart(item.matchId, String(item.category), item.quantity);
    
    if (response?.tickets?.length) {
      createdTickets.push(...response.tickets);
    }
  }
  
  return createdTickets;
}


