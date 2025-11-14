import type { FC } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllTickets } from "../../services/api/ticketsService";
import type { Ticket, TicketStatus } from "../../Types/Ticket";
import Button from "../Button/Button";

type GroupedTickets = {
  pending: Ticket[];
  confirmed: Ticket[];
  used: Ticket[];
  other: Ticket[];
};

function groupByStatus(tickets: Ticket[]): GroupedTickets {
  const grouped: GroupedTickets = {
    pending: [],
    confirmed: [],
    used: [],
    other: [],
  };

  tickets.forEach((t) => {
    const s: TicketStatus | string = t.status;
    if (s === "pending_payment") grouped.pending.push(t);
    else if (s === "confirmed") grouped.confirmed.push(t);
    else if (s === "used") grouped.used.push(t);
    else grouped.other.push(t);
  });

  return grouped;
}

const TicketsSection: FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [grouped, setGrouped] = useState<GroupedTickets>({
    pending: [],
    confirmed: [],
    used: [],
    other: [],
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const tickets = await getAllTickets();
        if (cancelled) return;
        setGrouped(groupByStatus(tickets));
      } catch (err) {
        if (cancelled) return;
        const msg =
          err instanceof Error
            ? err.message
            : "Unable to load your tickets history.";
        setError(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Page>
      <Title>My tickets</Title>

      {loading && <InfoText>Loading your tickets…</InfoText>}
      {error && <ErrorBox>{error}</ErrorBox>}

      {!loading && !error && (
        <>
          <SectionBlock>
            <SectionHeading>Upcoming tickets (confirmed)</SectionHeading>
            {grouped.confirmed.length === 0 ? (
              <InfoText>No confirmed tickets yet.</InfoText>
            ) : (
              <TicketsList tickets={grouped.confirmed} />
            )}
          </SectionBlock>

          {grouped.pending.length > 0 && (
            <SectionBlock>
              <SectionHeading>Pending payment</SectionHeading>
              <InfoText>
                These tickets are still pending on the server.
              </InfoText>
              <TicketsList tickets={grouped.pending} />
            </SectionBlock>
          )}

          {grouped.used.length > 0 && (
            <SectionBlock>
              <SectionHeading>Used tickets</SectionHeading>
              <TicketsList tickets={grouped.used} />
            </SectionBlock>
          )}

          {grouped.other.length > 0 && (
            <SectionBlock>
              <SectionHeading>Other tickets</SectionHeading>
              <TicketsList tickets={grouped.other} />
            </SectionBlock>
          )}

          <BackRow>
            <Button label="Back to matches" onClick={() => (window.location.href = "/matches")} />
          </BackRow>
        </>
      )}
    </Page>
  );
};

export default TicketsSection;


type TicketsListProps = { tickets: Ticket[] };

const TicketsList = ({ tickets }: TicketsListProps) => (
  <TicketsGrid>
    {tickets.map((t) => (
      <TicketCard key={t.id}>
        <TicketHeader>
          <strong>
            {t.match?.homeTeam} vs {t.match?.awayTeam}
          </strong>
        </TicketHeader>
        <TicketBody>
          <p>
            <Label>Category:</Label> {t.category}
          </p>
          <p>
            <Label>Price:</Label> ${t.price.toFixed(2)}
          </p>
          {t.status && (
            <p>
              <Label>Status:</Label> {t.status}
            </p>
          )}
          {t.seatNumber && (
            <p>
              <Label>Seat:</Label> {t.seatNumber}
            </p>
          )}
          {t.match && (
            <p>
              <Label>Stadium:</Label> {t.match.stadium}
            </p>
          )}
          {t.paymentDate && (
            <p>
              <Label>Paid at:</Label> {new Date(t.paymentDate).toLocaleString()}
            </p>
          )}
          {t.expiresAt && (
            <p>
              <Label>Expires at:</Label> {new Date(t.expiresAt).toLocaleString()}
            </p>
          )}
        </TicketBody>
      </TicketCard>
    ))}
  </TicketsGrid>
);


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
  color: #000;
`;

const SectionBlock = styled.section`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 32px;
`;

const SectionHeading = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const InfoText = styled.p`
  font-size: 0.95rem;
  color: #555;
`;

const ErrorBox = styled.div`
  background-color: #c53030;
  color: #fff;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.4rem;
  max-width: 600px;
  text-align: center;
`;

const TicketsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;

const TicketCard = styled.article`
  background: #ffffff;
  border-radius: 8px;
  padding: 12px 14px;
  border: 1px solid #ddd;
`;

const TicketHeader = styled.header`
  margin-bottom: 8px;
`;

const TicketBody = styled.div`
  font-size: 0.9rem;
  color: #333;

  p {
    margin: 2px 0;
  }
`;

const Label = styled.span`
  font-weight: 600;
`;

const BackRow = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`;
