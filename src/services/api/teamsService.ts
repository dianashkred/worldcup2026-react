import type { Team } from "../../Types/Team";

const BASE_URL = "https://worldcup2026.shrp.dev";


export async function getAllTeams(): Promise<Team[]> {
  const res = await fetch(`${BASE_URL}/teams`);
  if (!res.ok) throw new Error("Failed to fetch teams");

  const data = await res.json();

  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;

  console.error("Unexpected matches response format:", data);
  return []; 
}

export async function getTeamById(id: number): Promise<Team> {
  const res = await fetch(`${BASE_URL}/teams/${id}`);
  if (!res.ok) throw new Error("Team not found");

  const data = await res.json();
  return data.data || data;
}
