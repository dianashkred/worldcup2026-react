import type { FC } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MatchList from "../components/Matches/MatchList";

const MatchesPage: FC = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <Title>Les Matchs</Title>
        <MatchList />
      </MainContainer>
      <Footer />
    </>
  );
};


export default MatchesPage;


const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 80vh;
  background-color: #fff;
  padding: 3rem 1.5rem;
`;


const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  color: #000;
`;