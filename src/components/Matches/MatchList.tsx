import styled from "styled-components";
import { useEffect, useState } from "react";
import type { FC } from "react";
import { getAllMatches } from "../../services/api/matchesService";
import type { Match } from "../../Types/Match";
import MatchCard from "./MatchCard";
import MatchFilter from "./MatchFilter";

const MatchList: FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [filters, setFilters] = useState({ team: "", date: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllMatches()
      .then((data) => {
        if (Array.isArray(data)) {
          setMatches(data);
        } else {
          console.error("API returned invalid format:", data);
          setMatches([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load matches:", err);
        setError("Impossible de charger les matchs.");
      });
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

        return byTeam && byDate;
      })
    );
  }, [filters, matches]);

  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <Container>
      <Title>Les Matchs</Title>
      <MatchFilter
        selectedTeam={filters.team}
        selectedDate={filters.date}
        onFilterChange={setFilters}
      />

      {filteredMatches.length > 0 ? (
        filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))
      ) : (
        <NoResults>Aucun match trouvé.</NoResults>
      )}
    </Container>
  );
};

export default MatchList;


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
  color: #000;
`;