import styled from "styled-components";
import type { FC } from 'react';
import { useNavigate } from "react-router-dom";
import type { Match } from "../../Types/Match";
import { formatDate } from "../../utils/formatDate";
import Button from "../Button/Button";


interface MatchCardProps {
  match: Match;
}

const MatchCard: FC<MatchCardProps> = ({ match }) => {
  const { homeTeam, awayTeam, stadium, date } = match;
  
  const navigate = useNavigate();
    const handleAddClick = () => {
    navigate(`/order`);
  };

  return (
    <CardContainer onClick={() => navigate(`/match/${match.id}`)}>
      <Teams>
        <span>{homeTeam.flagImagePath}</span>
        <TeamName>{homeTeam.name}</TeamName>
        <VS>vs</VS>
        <TeamName>{awayTeam.name}</TeamName>
        <span>{awayTeam.flagImagePath}</span>
      </Teams>

      <Details>
        <DateText>{formatDate(date)}</DateText>
        <PlaceText>{stadium.city}, {stadium.countryCode}</PlaceText>
      </Details>

      <PlusButtonWrapper>
        <Button label="+" onClick={handleAddClick} style={false}/>
      </PlusButtonWrapper>
    </CardContainer>
  );
};
export default MatchCard;


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

  &:hover {
    background: #d6d6d6;
  }
`;

const Teams = styled.div`
  display: flex;
  align-items: center;
  flex: 1.5;
  gap: 0.6rem;
  font-weight: 500;
`;

const TeamName = styled.span`
  font-weight: 600;
`;

const VS = styled.span`
  margin: 0 0.5rem;
  color: #333;
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
