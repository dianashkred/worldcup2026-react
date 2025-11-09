import { useEffect, useState } from "react";
import styled from "styled-components";
import type { FC } from "react";
import { getAllMatches } from "../../services/api/matchesService";
import { getAllGroups } from "../../services/api/groupsService";
import type { Group } from "../../Types/Group";
import type { Match } from "../../Types/Match";
import MatchCard from "./MatchCard";
import MatchFilter from "./MatchFilter";
import type { Team } from '../../Types/Team';
import { getAllTeams } from "../../services/api/teamsService";
import { useLocation } from "react-router-dom";

const MatchList: FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [filters, setFilters] = useState({ team: "", date: "", group: "" });
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const location = useLocation();

  useEffect(() => {
    async function loadData() {
      try {
        const [matchesData, groupsData, teamsData] = await Promise.all([
          getAllMatches(),
          getAllGroups(),
          getAllTeams(),
        ]);

        if (Array.isArray(matchesData) && Array.isArray(groupsData) && Array.isArray(teamsData)) {
          const groupMap = new Map(groupsData.map((g) => [g.id, g]));

          const enrichedMatches = matchesData.map((match) => ({
            ...match,
            homeTeam: {
              ...match.homeTeam,
              group: groupMap.get(match.homeTeam.groupId),
            },
            awayTeam: {
              ...match.awayTeam,
              group: groupMap.get(match.awayTeam.groupId),
            },
          }));

          setMatches(enrichedMatches as Match[]);
          setGroups(groupsData);
          setTeams(teamsData);
        }
      } catch (err) {
        console.error("Failed to load matches or groups:", err);
        setError("Failed to load matches.");
      }
    }

    loadData();
  }, []);


  useEffect(() => {
    const lowerTeam = filters.team.toLowerCase();

    setFilteredMatches(
      matches.filter((m) => {
        const byTeam =
          !filters.team ||
          m.homeTeam.name.toLowerCase().includes(lowerTeam) ||
          m.awayTeam.name.toLowerCase().includes(lowerTeam);

        const byDate =
          !filters.date ||
          new Date(m.date).toDateString() ===
          new Date(filters.date).toDateString();

        const homeGroup = m.homeTeam?.group?.name;
        const awayGroup = m.awayTeam?.group?.name;

        const byGroup =
          !filters.group ||
          homeGroup === filters.group ||
          awayGroup === filters.group;

        return byTeam && byDate && byGroup;
      })
    );
  }, [filters, matches]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const teamId = params.get("team");

    if (teamId && teams.length > 0) {
      const team = teams.find(t => t.id.toString() === teamId);
      if (team) {
        setFilters(prev => ({
          ...prev,
          team: team.name
        }));
      }
    }
  }, [location.search, teams]);



  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <Container>
      <Title>Matches</Title>

      <MatchFilter
        selectedTeam={filters.team}
        selectedDate={filters.date}
        selectedGroup={filters.group}
        groups={groups}
        teams={teams}
        onFilterChange={setFilters}
      />

      {filteredMatches.length > 0 ? (
        filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))
      ) : (
        <NoResults>No matches found.</NoResults>
      )}
    </Container>
  );
};

export default MatchList;

const Container = styled.div`
  display: flex;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  margin-top: 80px;

`;

const ErrorText = styled.p`
  color: red;
  font-size: 1.1rem;
  margin-top: 2rem;
`;

const NoResults = styled.p`
  margin-top: 2rem;
  color: #555;
  font-size: 1rem;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: #000;
`;
