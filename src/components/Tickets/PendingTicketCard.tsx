import styled from "styled-components";
import type { Ticket } from "../../Types/Ticket";
import { formatCategoryLabel } from "../../utils/categoryLabel";

export const PendingTicketCard = ({ t }: { t: Ticket }) => (
  <Card>
    <Header>
      <strong>{t.match?.homeTeam} vs {t.match?.awayTeam}</strong>
    </Header>

    <Body>
      <p><Label>Category:</Label> {formatCategoryLabel(t.category)}</p>
      <p><Label>Price:</Label> ${t.price.toFixed(2)}</p>
      <p><Label>Status:</Label> {t.status}</p>

      {t.match && <p><Label>Stadium:</Label> {t.match.stadium}</p>}
      {t.expiresAt && <p><Label>Expires at:</Label> {new Date(t.expiresAt).toLocaleString()}</p>}
    </Body>
  </Card>
);

const Card = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  box-shadow: rgba(0, 0, 0, 0.03) 0px 3px 6px;
`;

const Header = styled.div`
  margin-bottom: 10px;
  font-size: 1rem;
`;

const Body = styled.div`
  font-size: 0.9rem;
  color: #333;
  p {
    margin: 4px 0;
  }
`;

const Label = styled.span`
  font-weight: 600;
`;
