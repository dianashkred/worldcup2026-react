import type { MatchCategories } from "./Match";

export type TicketStatus =
  | "pending_payment"
  | "confirmed"
  | "used"
  | "cancelled";

export type Ticket = {
  id: string;
  matchId: number;
  userId: number;
  category: keyof MatchCategories;
  price: number;
  status: TicketStatus;
  seatNumber?: string;
  qrCode?: string;
  expiresAt?: string;
  paymentDate?: string;
  match?: {
    homeTeam: string;
    awayTeam: string;
    stadium: string;
  };
};

export type TicketCartResponse = {
  success: boolean;
  data: {
    tickets: Ticket[];
    totalPrice: number;
    expiresAt: string;
  };
};

export type PendingTicketsResponse = {
  success: boolean;
  data: {
    tickets: Ticket[];
    count: number;
    totalPrice: number;
  };
};

export type UserTicketsGrouped = {
  pending: Ticket[];
  confirmed: Ticket[];
  used: Ticket[];
};

export type UserTicketsResponse = {
  success: boolean;
  data: {
    tickets: Ticket[];
    grouped: UserTicketsGrouped;
    counts: {
      total: number;
      pending: number;
      confirmed: number;
      used: number;
    };
  };
};

