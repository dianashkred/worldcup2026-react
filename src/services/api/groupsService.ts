import type { Group } from "../../Types/Group";

const BASE_URL = "https://worldcup2026.shrp.dev";


export async function getAllGroups(): Promise<Group[]> {
  const res = await fetch(`${BASE_URL}/groups`);
  if (!res.ok) throw new Error("Failed to fetch groups");
  const data = await res.json();

  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  return [];
}
