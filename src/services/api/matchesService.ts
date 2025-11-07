import type { Match } from "../../Types/Match";

const BASE_URL = "https://worldcup2026.shrp.dev";


export async function getAllMatches(): Promise<Match[]> {
  const res = await fetch(`${BASE_URL}/matches`);
  if (!res.ok) throw new Error("Failed to fetch matches");

  const data = await res.json();

  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;

  console.error("Unexpected matches response format:", data);
  return []; 
}

export async function getMatchById(id: number): Promise<Match> {
  const res = await fetch(`${BASE_URL}/matches/${id}`);
  if (!res.ok) throw new Error("Match not found");

  const data = await res.json();
  return data.data || data;
}

export async function getMatchAvailability(id: number): Promise<Match["categories"] | null> {
  const res = await fetch(`${BASE_URL}/matches/${id}/availability`);
  if (!res.ok) throw new Error(`Failed to fetch availability for match ${id}`);

  const data = await res.json();

  if (data && data.data && data.data.categories) return data.data.categories;
  if (data && data.categories) return data.categories;

  console.error("Unexpected match availability format:", data);
  return null;
}