import type { FC } from 'react';
import Header from '../components/Header/Header';
import HomeMainSection from '../components/HomeMainSection/HomeMainSection';
import Footer from '../components/Footer/Footer';


const HomePage: FC = () => {
  return(
  <>
    <Header/>
    <HomeMainSection />;
    <Footer/>
  </>
  );
};

export default HomePage;