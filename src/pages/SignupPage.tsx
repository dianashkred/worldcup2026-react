import type { FC } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import SignupSection from '../components/Auth/SignupSection';

const LoginPage: FC = () => {
  return(
  <>
    <Header/>
    <SignupSection/>
    <Footer/>
  </>
  );
};

export default LoginPage;