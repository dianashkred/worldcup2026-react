import './App.css'
import React from 'react';
import type { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MatchesPage from './pages/MatchesPage';
import GroupsPage from './pages/GroupsPage';
import TeamsPage from './pages/TeamsPage';

const App: FC = () => {
 return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/matches" element={<MatchesPage/>}/>
          <Route path="/groups" element={<GroupsPage/>}/>
          <Route path="/teams" element={<TeamsPage/>}/>
       </Routes>
      </Router>
    </div>
  );
};

export default App;
