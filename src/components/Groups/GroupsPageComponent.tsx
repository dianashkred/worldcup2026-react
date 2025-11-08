import { useEffect, useState, type FC } from 'react';
import { getAllGroups } from '../../services/api/groupsService';
import type { Group } from '../../Types/Group';
import GroupsComponent from './GroupsComponent';
import GroupsFilterComponent from './GroupsFilterComponent';
import styled from 'styled-components';




const GroupsPageComponent: FC = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [allGroups, setAllGroups] = useState<Group[]>([]);


    useEffect(() => {

        fetchGroups();
    }, []);

    async function fetchGroups() {
        const newGroups = await getAllGroups()
        setGroups(newGroups);
        setAllGroups(newGroups);
    }

    function filterGroups(name: string) {
        const filteredGroups =
            name === ""
                ? allGroups
                : allGroups.filter((group) =>
                    group.name === name);
        setGroups(filteredGroups);

    }





    return (

        <>

            <span>
                <h1> The Groups: </h1>
                <GroupsWrapper>
                    <GroupsFilterComponent filterGroups={filterGroups} />
                    {groups.map((group) => <GroupsComponent group={group} />)}
                </GroupsWrapper>
            </span>

        </>
    )
};


export default GroupsPageComponent;

const GroupsWrapper = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 10px; 
  align-items: center; 
`;
