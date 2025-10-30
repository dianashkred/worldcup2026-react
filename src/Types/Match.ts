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
    date: Date,
    availableSeats: number,
    priceMultiplier: number,
    createdAt:Date,
    updatedAt:Date

}
