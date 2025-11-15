import styled from "styled-components";
import type { Ticket } from "../../Types/Ticket";
import { formatCategoryLabel } from "../../utils/categoryLabel";

export const TicketCard = ({ t }: { t: Ticket }) => (
  <Card>
    <Header>
      <strong>{t.match?.homeTeam} vs {t.match?.awayTeam}</strong>
    </Header>

    <Body>
      <p><Label>Category:</Label> {formatCategoryLabel(t.category)}</p>
      <p><Label>Price:</Label> ${t.price.toFixed(2)}</p>
      <p><Label>Status:</Label> {t.status}</p>

      {t.seatNumber && (
        <p><Label>Seat:</Label> {t.seatNumber}</p>
      )}

      {t.match && <p><Label>Stadium:</Label> {t.match.stadium}</p>}

      {t.paymentDate && (
        <p><Label>Paid at:</Label> {new Date(t.paymentDate).toLocaleString()}</p>
      )}
    </Body>
  </Card>
);


const Card = styled.article`
  background: #ffffff;
  border-radius: 8px;
  padding: 12px 14px;
  border: 1px solid #ddd;
`;

const Header = styled.header`
  margin-bottom: 8px;
`;

const Body = styled.div`
  font-size: 0.9rem;
  p {
    margin: 2px 0;
  }
`;

const Label = styled.span`
  font-weight: 600;
`;
