import type { Ticket, TicketStatus } from "../../Types/Ticket";

export type GroupedTickets = {
  pending: Ticket[];
  confirmed: Ticket[];
  used: Ticket[];
  other: Ticket[];
};

export function groupByStatus(tickets: Ticket[]): GroupedTickets {
  const grouped: GroupedTickets = {
    pending: [],
    confirmed: [],
    used: [],
    other: [],
  };

  tickets.forEach((t) => {
    const s: TicketStatus | string = t.status;

    if (s === "pending_payment") grouped.pending.push(t);
    else if (s === "confirmed") grouped.confirmed.push(t);
    else if (s === "used") grouped.used.push(t);
    else grouped.other.push(t);
  });

  return grouped;
}
