import { useState } from "react";
import styled from "styled-components";
import type { FC } from 'react';
import type { Match } from "../../Types/Match";
import { formatDate } from "../../utils/formatDate";
import Button from "../Button/Button";
import MatchDetails from "./MatchDetails";



interface MatchCardProps {
  match: Match;
}

const MatchCard: FC<MatchCardProps> = ({ match }) => {
  const { homeTeam, awayTeam, stadium, date } = match;
  const [isExpanded, setIsExpanded] = useState(false);

  

  const getFlagPath = (flagPath: string) => {
    if (!flagPath) return "";
    return flagPath.replace(/^\/public/, ""); 
  };

    const matchGroup = homeTeam?.group?.name ?? "Unknown";

    const toggleDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsExpanded((prev) => !prev);
  };


  return (
    <CardContainer>
      <CardHeader>
      <Teams>
        <Flag src={getFlagPath(homeTeam.flagImagePath)} alt={homeTeam.name} />
        <TeamName>{homeTeam.name}</TeamName>
        <VS>vs</VS>
        <TeamName>{awayTeam.name}</TeamName>
        <Flag src={getFlagPath(awayTeam.flagImagePath)} alt={awayTeam.name} />
        
      </Teams>
      <GroupText>Group: {matchGroup}</GroupText>

      <Details>
        <DateText>{formatDate(date)}</DateText>
        <PlaceText>{stadium.name}, {stadium.city}, {stadium.countryCode}</PlaceText>
      </Details>

      <PlusButtonWrapper>
        <Button label={isExpanded ? "−" : "+"} onClick={toggleDetails} style={true}/>
      </PlusButtonWrapper>
      </CardHeader>

      {isExpanded && <MatchDetails matchId={match.id} />}
    </CardContainer>
  );
};
export default MatchCard;


const CardContainer = styled.div`
  background: #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 900px;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  transition: 0.2s ease;

  &:hover {
    background: #d6d6d6;
  }
`;

const Teams = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
  gap: 0.6rem;
  font-weight: 500;
`;


const Flag = styled.img`
  width: 48px;
  height: 32px;
  object-fit: contain;
  border-radius: 4px;
  border: none;
  box-shadow: none;
  margin-right: 0.5rem;
`;

const TeamName = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: #000;
`;

const VS = styled.span`
  margin: 0 0.5rem;
  color: #333;
`;
const GroupText = styled.span`
  flex: 1;
  text-align: center;
  font-weight: 500;
  font-size: 0.95rem;
  color: #000;
`;
const Details = styled.div`
  flex: 1;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const DateText = styled.span`
  font-size: 0.95rem;
  color: #333;
`;

const PlaceText = styled.span`
  font-size: 0.9rem;
  color: #555;
`;

const PlusButtonWrapper = styled.div`
  margin-left: 1.5rem;
  flex-shrink: 0;
`;
