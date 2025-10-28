import './App.css'
import type { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const App: FC = () => {
 return (
    <div className="App">
      <Router>
        <Routes>
           <Route index element={<HomePage />} />
           <Route path="login" element={<LoginPage />} />
       </Routes>
      </Router>
    </div>
  );
};

export default App;
