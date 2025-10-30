import type { FC } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import type { Team } from '../Types/Team';
import TeamsComponent from '../components/Teams/TeamsComponent';



const algeriaTeam: Team = {
  id: 42,
  name: "Algeria",
  code: "ALG",
  flag: "🇩🇿",
  confederation: "CAF",
  continent: "Africa",
  groupId: 11,
  group: {
    id: 11,
    name: "K",
    teams:[]
  },
  createdAt: new Date("2025-10-12T20:23:54.373Z"),
  updatedAt: new Date("2025-10-12T20:23:54.373Z"),
  flagImagePath: "/public/flags/ALG.png",
};

const TeamsPage: FC = () => {
  return(
  <>
    <Header/>
    <TeamsComponent team={algeriaTeam}/>
    <Footer/>
  </>
  );
};

export default TeamsPage;