import styled from "styled-components";
import type { FC } from 'react';

interface MatchFilterProps {
  selectedTeam: string;
  selectedDate: string;
  onFilterChange: (filters: { team: string; date: string }) => void;
}

const MatchFilter: FC<MatchFilterProps> = ({
  selectedTeam,
  selectedDate,
  onFilterChange,
}) => {
  return (
    <FilterContainer>
      <FilterInput
        type="date"
        value={selectedDate}
        onChange={e => onFilterChange({ team: selectedTeam, date: e.target.value })}
      />
      <FilterInput
        type="text"
        placeholder="Rechercher une équipe"
        value={selectedTeam}
        onChange={e => onFilterChange({ team: e.target.value, date: selectedDate })}
      />
    </FilterContainer>
  );
};
export default MatchFilter;
const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterInput = styled.input`
  border: 1px solid #333;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  background-color: #111;
  color: #fff;
  width: 220px;

  &::placeholder {
    color: #aaa;
  }
`;
