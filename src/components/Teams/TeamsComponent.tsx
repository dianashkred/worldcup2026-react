import styled from "styled-components";
import type { Team } from "../../Types/Team";
import Button from "../Button/Button";

type TeamsComponentProps = {
  team: Team;
};

export default function TeamsComponent({ team }: TeamsComponentProps) {
  const getFlagPath = (flagPath: string) => {
    if (!flagPath) return "";
    return flagPath.replace(/^\/public/, "");
  };

  return (
    <CardContainer>
      <TeamSection>
        <Flag src={getFlagPath(team.flagImagePath)} alt={team.name} />
        <TeamName>{team.name}</TeamName>
      </TeamSection>

      <TeamInfo>Group: {team.group?.name ?? "Unknown"}</TeamInfo>
      <TeamInfo>Confederation: {team.confederation}</TeamInfo>

      <ButtonWrapper>
        <MatchesButton label="Show Matches" to={`/matches?team=${team.id}`} />
      </ButtonWrapper>
    </CardContainer>
  );
}


const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #e0e0e0;
  color: #000;
  width: 100%;
  max-width: 900px;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  transition: 0.2s ease;
  gap: 2rem;

  &:hover {
    background: #d6d6d6;
  }
`;

const TeamSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1.5;
  gap: 1rem;
`;

const Flag = styled.img`
  width: 48px;
  height: 32px;
  object-fit: contain;
  border-radius: 4px;
  border: none;
  box-shadow: none;
`;

const TeamName = styled.div`
  font-weight: 600;
  font-size: 1rem;
`;

const TeamInfo = styled.div`
  flex: 1;
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  margin-left: 1.5rem;
  flex-shrink: 0;
`;

const MatchesButton = styled(Button)`
  min-width: 180px;
  height: auto;
  background-color: #222;
  font-size: 18px;
  border-radius: 10px;

  &:hover {
    background-color: #444;
    transform: scale(1.05);
  }
`;
