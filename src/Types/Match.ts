import type { Stadium } from "./Stadium"
import type { Team } from "./Team"

export type Match={
    id: number,
    homeTeamId: number,
    homeTeam: Team,
    awayTeamId:number,
    awayTeam: Team,
    stadiumId: number,
    stadium: Stadium,
    status: string,
    stage: string,
    date: string,
    availableSeats: number,
    priceMultiplier: number,
    createdAt:Date,
    updatedAt:Date

}

/*export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  stadium: Stadium;
  date: string;
  stage: string;
  status: string;
  availableSeats: number;
  categories: Record<string, MatchCategory>;
}*/