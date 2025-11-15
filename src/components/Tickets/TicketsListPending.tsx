import styled from "styled-components";
import type { Ticket } from "../../Types/Ticket";
import { PendingTicketCard } from "./PendingTicketCard";

const TicketsListPending = ({ tickets }: { tickets: Ticket[] }) => (
  <Grid>
    {tickets.map((t) => (
      <PendingTicketCard key={t.id} t={t} />
    ))}
  </Grid>
);

export default TicketsListPending;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
  margin-top: 8px;
`;
