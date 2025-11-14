import type { FC } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TicketsSection from "../components/Tickets/TicketsSection";

const TicketsPage: FC = () => {
  return (
    <>
      <Header />
      <TicketsSection />
      <Footer />
    </>
  );
};

export default TicketsPage;
