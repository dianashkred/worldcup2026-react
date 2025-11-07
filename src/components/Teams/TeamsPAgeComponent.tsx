import { useEffect, useState, type FC } from 'react';
import type { Team } from '../../Types/Team';




import TeamsComponent from './TeamsComponent';
import { getAllTeams } from '../../services/api/teamsService';
import TeamsFilterComponent from './TeamsFilterComponent';




const TeamsPageComponent: FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [allTeams,setAllTeams]=useState<Team[]>([]);


  useEffect(() => {
    
    fetchTeams();
  }, []);

  async function fetchTeams() {
      const newTeams = await getAllTeams()
      setTeams(newTeams);
      setAllTeams(newTeams);
    }

  function filterTeams(continent: string) {
    const filteredTeams =
      continent === ""
        ? allTeams
        : allTeams.filter((team) =>
          team.continent === continent);
    setTeams(filteredTeams);
  }





  return (

    <>

      <span>
        <h1> The Teams: </h1>
        <TeamsFilterComponent filterTeams={filterTeams} />
        {teams.map((team) => <TeamsComponent team={team} />)}
      </span>

    </>
  )
};


export default TeamsPageComponent;


