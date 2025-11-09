import type { PendingTicketsResponse, TicketCartResponse } from "../../Types/Ticket";

const BASE_URL = "https://worldcup2026.shrp.dev";

export async function addTicketToCart(
  matchId: number,
  category: string,
  quantity: number
): Promise<TicketCartResponse["data"]> {
  const res = await fetch(`${BASE_URL}/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ matchId, category, quantity }),
  });

  if (!res.ok) {
    throw new Error(`Failed to add ticket to cart (${res.status})`);
  }

  const data: TicketCartResponse = await res.json();

  return data.data || {
    tickets: [],
    totalPrice: 0,
    expiresAt: "",
  };
}

export async function getPendingTickets(): Promise<PendingTicketsResponse["data"]> {
  const res = await fetch(`${BASE_URL}/tickets/pending`);
  if (!res.ok) throw new Error("Failed to fetch pending tickets");

  const data: PendingTicketsResponse = await res.json();
  return data.data;
}


export async function getAllTickets(): Promise<TicketCartResponse["data"]["tickets"]> {
  const res = await fetch(`${BASE_URL}/tickets`, { method: "GET" });
  if (!res.ok) throw new Error("Failed to fetch tickets");

  const data: TicketCartResponse = await res.json();
  return data.data?.tickets || [];
}
