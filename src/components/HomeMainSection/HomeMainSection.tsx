import type { FC } from 'react';
import {Route , Routes, Link} from 'react-router-dom';
import GroupsPage from '../GroupsPage';
import TeamsPage from '../TeamsPage';
import MatchesPage from '../MatchesPage';

const HomeMainSection: FC = () => {
  return (
    <>
      <section>
        <h1>Welcome to World Cup 2026</h1>
      </section>
      
      <div>
        <Link to="/matches">Matches</Link>
        <Link to="/groups">Groups</Link>
        <Link to="/teams">Teams</Link>
      </div>
      
    </>
   

  );
};  
export default HomeMainSection;
