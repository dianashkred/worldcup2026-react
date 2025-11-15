import styled from "styled-components";
import type { Ticket } from "../../Types/Ticket";
import { TicketCard } from "./TicketCard";

const TicketsList = ({ tickets }: { tickets: Ticket[] }) => (
  <Grid>
    {tickets.map((t) => (
      <TicketCard key={t.id} t={t} />
    ))}
  </Grid>
);

export default TicketsList;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;
