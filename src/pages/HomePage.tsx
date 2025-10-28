import type { FC } from 'react';
import Header from '../components/Header/Header';
import HomeMainSection from '../components/HomeMainSection/HomeMainSection';


const HomePage: FC = () => {
  return(
  <>
    <Header/>
    <HomeMainSection />;
  </>
  );
};

export default HomePage;