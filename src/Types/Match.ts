import type { Stadium } from "./Stadium"
import type { Team } from "./Team"

export type MatchCategory = {
  available: boolean;
  totalSeats: number;
  availableSeats: number;
  soldSeats: number;
  price: number;
};

export type MatchCategories = {
  VIP: MatchCategory;
  CATEGORY_1: MatchCategory;
  CATEGORY_2: MatchCategory;
  CATEGORY_3: MatchCategory;
};

export type Match = {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  stadium: Stadium;
  date: string;
  status: "upcoming" | "live" | "finished" | "cancelled";
  stage: string;
  priceMultiplier: number;
  availableSeats: number;
  categories?: MatchCategories;
};
