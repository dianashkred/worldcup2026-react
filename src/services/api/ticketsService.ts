import type { PendingTicketsResponse, TicketCartResponse } from "../../Types/Ticket";

const BASE_URL = "https://worldcup2026.shrp.dev";

export async function addTicketToCart(
  matchId: number,
  category: string,
  quantity: number
): Promise<TicketCartResponse> {
  const res = await fetch(`${BASE_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ matchId, category, quantity }),
  });

  if (!res.ok) throw new Error("Failed to add ticket to cart");

  const data = await res.json();
  return data.data || data;
}

export async function getPendingTickets(): Promise<PendingTicketsResponse["data"]> {
  const res = await fetch(`${BASE_URL}/tickets/pending`);
  if (!res.ok) throw new Error("Failed to fetch pending tickets");

  const data = await res.json();
  return data.data;
}
