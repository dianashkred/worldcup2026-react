import type { FC } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MatchList from "../components/Matches/MatchList";

const MatchesPage: FC = () => {
  return (
    <>
      <Header />
      <MatchList />
      <Footer />
    </>
  );
};


export default MatchesPage;

