import { useEffect, useState, type FC } from 'react';
import type {Team} from '../../Types/Team';


import styled from 'styled-components';
import TeamsComponent from './TeamsComponent';
import { getAllTeams } from '../../services/api/teamsService';




const TeamsPage: FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  useEffect(()=>{
    async function fetchTeams(){
      let allTeams = await getAllTeams()
    setTeams(allTeams)
    }
    fetchTeams();
  },[]);
    
    
  
  
  return(
    
  <>
    
    <span>
        <h1> The Teams: </h1>
        {teams.map((team)=><TeamsComponent team={team}/>)}
    </span>
    
  </>
  )
};


export default TeamsPage;


