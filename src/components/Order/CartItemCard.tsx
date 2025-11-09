import type { FC } from "react";
import styled from "styled-components";
import type { CartItem } from "../../features/cart/cartSlice";
import { formatDate } from "../../utils/formatDate";
import { formatCategoryLabel } from "../../utils/categoryLabel";
import {getFlagPath } from "../../utils/getFlagPath";
import QtyStepper from "../QtyInput/QtyStepper";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { removeTicket, updateQuantity } from "../../features/cart/cartSlice";
import type { AppDispatch } from "../../features/store";

type Props = { item: CartItem };

const CartItemCard: FC<Props> = ({ item }) => {
  const d = useDispatch<AppDispatch>();
  const m = item.match; 

  return (
    <Card>
      <Row>
        <Teams>
          <Flag src={getFlagPath(m?.homeTeam?.flagImagePath)} alt={m?.homeTeam?.name ?? ""} />
          <TeamName>{m?.homeTeam?.name ?? "—"}</TeamName>
          <VS>vs</VS>
          <TeamName>{m?.awayTeam?.name ?? "—"}</TeamName>
          <Flag src={getFlagPath(m?.awayTeam?.flagImagePath)} alt={m?.awayTeam?.name ?? ""} />
        </Teams>

        <GroupText>Group: {m?.homeTeam?.group?.name ?? "—"}</GroupText>

        <WhenWhere>
          <DateText>{m ? formatDate(m.date) : "—"}</DateText>
          <PlaceText>
            {m?.stadium?.name ?? "—"}, {m?.stadium?.city ?? "—"}, {m?.stadium?.countryCode ?? "—"}
          </PlaceText>
        </WhenWhere>

        <MetaCell>{formatCategoryLabel(String(item.category))}</MetaCell>

        <QtyCell>
          <QtyStepper
            value={item.quantity}
            max={6}
            onChange={(q) =>
              q <= 0
                ? d(removeTicket({ matchId: item.matchId, category: String(item.category) }))
                : d(updateQuantity({ matchId: item.matchId, category: String(item.category), quantity: q }))
            }
          />
        </QtyCell>

        <MetaCellRight>${(item.price * item.quantity).toFixed(2)}</MetaCellRight>

        <RemoveCell>
          <Button
            label="Х"
            variant="step"
            onClick={() => d(removeTicket({ matchId: item.matchId, category: String(item.category) }))}
          />
        </RemoveCell>
      </Row>
    </Card>
  );
};

export default CartItemCard;

const Card = styled.div`
  background: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: background 0.2s ease;
  &:hover {
    background: #d6d6d6;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2.4fr 0.8fr 2.2fr 0.9fr 1.1fr 0.9fr 0.4fr;
  align-items: center;
  column-gap: 18px;
  padding: 1.2rem 1.8rem;
  min-height: 92px;
`;

const Teams = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 500;
`;

const Flag = styled.img`
  width: 48px;
  height: 32px;
  object-fit: contain;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

const TeamName = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: #000;
`;

const VS = styled.span`
  margin: 0 0.5rem;
  color: #333;
`;

const GroupText = styled.span`
  text-align: center;
  font-weight: 500;
  font-size: 0.95rem;
  color: #000;
`;

const WhenWhere = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
`;

const DateText = styled.span`
  font-size: 0.95rem;
  color: #333;
`;

const PlaceText = styled.span`
  font-size: 0.9rem;
  color: #555;
`;

const MetaCell = styled.div`
  font-weight: 600;
  color: #000;
`;

const QtyCell = styled.div`
  display: flex;
  justify-content: center;
`;

const MetaCellRight = styled(MetaCell)`
  justify-self: end;
`;

const RemoveCell = styled.div`
  justify-self: end;
`;
