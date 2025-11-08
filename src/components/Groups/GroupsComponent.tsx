import styled from "styled-components";
import type { Group } from "../../Types/Group";

type TeamsComponentProps = {
    group: Group;
};

export default function GroupsComponent({ group }: TeamsComponentProps) {
    const getFlagPath = (flagPath: string) => {
        if (!flagPath) return "";
        return flagPath.replace(/^\/public/, "");
    };

    return (

        <GroupContainer>
            <GroupTitle>Group {group.name} </GroupTitle>
            <CountriesRow>
                {group.teams?.map((team) => (
                    <CountryItem key={team.id}>
                        <FlagImg src={getFlagPath(team.flagImagePath)} alt={team.name} />
                        <span>{team.name}</span>
                    </CountryItem>
                ))}
            </CountriesRow>
        </GroupContainer>

    );
}


const GroupContainer = styled.div`
  background: #e6e6e6;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;

`;

const GroupTitle = styled.h3`
  margin: 0 0 15px 0;
  font-weight: bold;
  text-align: center;
`;

export const CountriesRow = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CountryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const FlagImg = styled.img`
  width: 40px;
  height: auto;
  margin-bottom: 5px;
`;