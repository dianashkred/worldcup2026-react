import type { FC } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import LoginSection from '../components/Auth/LoginSection';

const LoginPage: FC = () => {
  return(
  <>
    <Header/>
    <LoginSection/>
    <Footer/>
  </>
  );
};

export default LoginPage;