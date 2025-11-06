import styled from "styled-components"
import type { Team } from "../../Types/Team"
import Button from "../Button/Button"

type TeamsComponentProps = {
    team: Team

}

export default function TeamsComponent({ team }: TeamsComponentProps) {
    return (
        <span>
            <CardContainer>

                <Team>{team.flag}</Team>
                <Team>{team.name}</Team>
                <Team>Group: {team.group.name}</Team>
                <Team>Confederation: {team.confederation}</Team>


                <ButtonWrapper>
                    <MatchesButton label="Show Matches" to={`/matches?team=${team.id}`} />
                </ButtonWrapper>
            </CardContainer>
        </span>
    )

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

const Team = styled.div`
  display: flex;
  align-items: center;
  flex: 1.5;
  gap: 11rem;
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

