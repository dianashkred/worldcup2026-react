import type { FC } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import SignupSection from '../components/Auth/SignupSection';

const SignupPage: FC = () => {
  return(
  <>
    <Header/>
    <SignupSection/>
    <Footer/>
  </>
  );
};

export default SignupPage;