import { useState } from "react";
import styled from "styled-components";
import type { FC } from "react";
import type { Group } from "../../Types/Group";

interface MatchFilterProps {
  selectedTeam: string;
  selectedDate: string;
  selectedGroup: string;
  groups: Group[];
  teams: { id: number; name: string }[];
  onFilterChange: (filters: { team: string; date: string; group: string }) => void;
}

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const years = Array.from({ length: 11 }, (_, i) => 2020 + i); 

const MatchFilter: FC<MatchFilterProps> = ({
  selectedTeam,
  selectedDate,
  selectedGroup,
  groups,
  teams,
  onFilterChange,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const today = new Date();

  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay(); 

  const handleDateSelect = (day: number) => {
    const chosen = new Date(selectedYear, selectedMonth, day);
    onFilterChange({
      team: selectedTeam,
      date: chosen.toISOString(),
      group: selectedGroup,
    });
    setShowCalendar(false);
  };

  const handleClear = () => {
    onFilterChange({
      team: selectedTeam,
      date: "",
      group: selectedGroup,
    });
    setShowCalendar(false);
  };

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <FilterContainer>
      {/* Filter by date */}
      <DateFilterWrapper>
        <DateButton onClick={() => setShowCalendar((p) => !p)}>
          {selectedDate
            ? new Date(selectedDate).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Filter by date"}
        </DateButton>

        {showCalendar && (
          <CalendarPopup>
            <Selectors>
              <SelectSmall
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {months.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </SelectSmall>

              <SelectSmall
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </SelectSmall>
            </Selectors>

            <WeekDays>
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <WeekDay key={d}>{d}</WeekDay>
              ))}
            </WeekDays>

            <DaysGrid>
              {Array.from({ length: firstDay }, (_, i) => (
                <EmptyCell key={`empty-${i}`} />
              ))}

              {daysArray.map((day) => (
                <DayCell
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  isToday={
                    day === today.getDate() &&
                    selectedMonth === today.getMonth() &&
                    selectedYear === today.getFullYear()
                  }
                >
                  {day}
                </DayCell>
              ))}
            </DaysGrid>

            <CalendarActions>
              <ActionButton onClick={handleClear}>Clear</ActionButton>
              <ActionButton
                onClick={() => {
                  onFilterChange({
                    team: selectedTeam,
                    date: today.toISOString(),
                    group: selectedGroup,
                  });
                  setShowCalendar(false);
                }}
              >
                Today
              </ActionButton>
            </CalendarActions>
          </CalendarPopup>
        )}
      </DateFilterWrapper>

      {/* Team filter */}
      <Select
        value={selectedTeam}
        onChange={(e) =>
          onFilterChange({
            team: e.target.value,
            date: selectedDate,
            group: selectedGroup,
          })
        }
      >
       <option value="">All teams</option>
       {teams.map((team) => (
          <option key={team.id} value={team.name}>
            {team.name}
          </option>
        ))}
      </Select>



      {/* Group filter */}
      <Select
        value={selectedGroup}
        onChange={(e) =>
          onFilterChange({
            team: selectedTeam,
            date: selectedDate,
            group: e.target.value,
          })
        }
      >
        <option value="">All groups</option>
        {groups.map((group) => (
          <option key={group.id} value={group.name}>
            Group {group.name}
          </option>
        ))}
      </Select>
    </FilterContainer>
  );
};

export default MatchFilter;


const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  position: relative;
`;

const DateFilterWrapper = styled.div`
  position: relative;
`;

const DateButton = styled.button`
  border: 1px solid #333;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  background-color: #111;
  color: #fff;
  width: 220px;
  cursor: pointer;
  text-align: left;
  &:hover {
    background-color: #222;
  }
`;

const CalendarPopup = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  background: #fff;
  border: 1px solid #aaa;
  border-radius: 8px;
  padding: 0.8rem;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 260px;
`;

const Selectors = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.6rem;
`;

const SelectSmall = styled.select`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.3rem;
  background: #f5f5f5;
  font-size: 0.9rem;
  cursor: pointer;
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0.3rem;
`;

const WeekDay = styled.div`
  text-align: center;
  font-weight: 600;
  color: #444;
  font-size: 0.8rem;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
  margin-bottom: 0.6rem;
`;

const DayCell = styled.div<{ isToday?: boolean }>`
  text-align: center;
  padding: 0.4rem 0;
  cursor: pointer;
  border-radius: 4px;
  color: ${(p) => (p.isToday ? "#007bff" : "#333")};
  font-weight: ${(p) => (p.isToday ? 600 : 400)};
  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const EmptyCell = styled.div`
  height: 1.6rem;
`;

const CalendarActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  border: none;
  background: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    text-decoration: underline;
  }
`;


const Select = styled.select`
  border: 1px solid #333;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  background-color: #111;
  color: #fff;
  width: 220px;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #6095de;
  }
`;
