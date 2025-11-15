import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllTickets, paySingleTicket } from "../../services/api/ticketsService";
import PaymentModal from "./PaymentModal";
import TicketsList from "./TicketsList";
import TicketsListPending from "./TicketsListPending";
import { groupByStatus } from "./groupTickets";
import type { GroupedTickets } from "./groupTickets";
import Button from "../Button/Button";

const TicketsSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [grouped, setGrouped] = useState<GroupedTickets>({
    pending: [],
    confirmed: [],
    used: [],
    other: [],
  });

  const [showPayModal, setShowPayModal] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState("");

  // LOAD USER TICKETS
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const tickets = await getAllTickets();
        if (!cancelled) setGrouped(groupByStatus(tickets));
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load your tickets.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // PAYMENT HANDLER
  const handleConfirmPayment = async () => {
    setPayLoading(true);
    setPayError("");

    try {
      await paySingleTicket();
      const tickets = await getAllTickets();
      setGrouped(groupByStatus(tickets));
      setShowPayModal(false);
    } catch {
      setPayError("Payment failed. Please try again.");
    } finally {
      setPayLoading(false);
    }
  };

  return (
    <Page>
      <Title>My tickets</Title>

      {loading && <Info>Loading your tickets…</Info>}
      {error && <ErrorBox>{error}</ErrorBox>}

      {!loading && !error && (
        <>
          {/* CONFIRMED */}
          <Block>
            <Heading>Upcoming tickets (confirmed)</Heading>
            {grouped.confirmed.length === 0 ? (
              <Info>No confirmed tickets yet.</Info>
            ) : (
              <TicketsList tickets={grouped.confirmed} />
            )}
          </Block>

          {/* PENDING */}
          {grouped.pending.length > 0 && (
            <Block>
              <Heading>Pending payment</Heading>
              <PendingInfo>
                You have {grouped.pending.length} unpaid ticket(s).
              </PendingInfo>

              <TicketsListPending tickets={grouped.pending} />

              <PayWrapper>
                <Button label="Pay all tickets" onClick={() => setShowPayModal(true)} />
              </PayWrapper>
            </Block>
          )}

          {/* USED */}
          {grouped.used.length > 0 && (
            <Block>
              <Heading>Used tickets</Heading>
              <TicketsList tickets={grouped.used} />
            </Block>
          )}

          {/* OTHER */}
          {grouped.other.length > 0 && (
            <Block>
              <Heading>Other tickets</Heading>
              <TicketsList tickets={grouped.other} />
            </Block>
          )}

          <Back>
            <Button label="Back to matches" onClick={() => (window.location.href = "/matches")} />
          </Back>
        </>
      )}

      {showPayModal && (
        <PaymentModal
          loading={payLoading}
          error={payError}
          onConfirm={handleConfirmPayment}
          onCancel={() => setShowPayModal(false)}
        />
      )}
    </Page>
  );
};

export default TicketsSection;


const Page = styled.main`
  min-height: 100vh;
  padding: 80px 20px;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Block = styled.section`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 32px;
`;

const Heading = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const PendingInfo = styled.p`
  color: #8a6b00;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Info = styled.p`
  color: #555;
`;

const ErrorBox = styled.div`
  background-color: #c53030;
  color: #fff;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.4rem;
`;

const PayWrapper = styled.div`
  margin-top: 22px;
  display: flex;
  justify-content: center;
`;

const Back = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`;
