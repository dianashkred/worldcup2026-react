import { useEffect, useState } from "react";
import styled from "styled-components";
import type { FC } from "react";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import { getMatchAvailability } from "../../services/api/matchesService";
import { addTicketAndRefresh } from "../../features/cart/cartSlice";
import type { AppDispatch } from "../../features/store";
import type { CategoryApi } from "../../Types/Match";

interface MatchDetailsProps {
  matchId: number;
}

const MatchDetails: FC<MatchDetailsProps> = ({ matchId }) => {
  const [ticketCounts, setTicketCounts] = useState({
    vip: 0,
    cat1: 0,
    cat2: 0,
    cat3: 0,
  });
  const [prices, setPrices] = useState({
    vip: 0,
    cat1: 0,
    cat2: 0,
    cat3: 0,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function loadAvailability() {
      try {
        const categories = await getMatchAvailability(matchId);
        if (categories) {
          setPrices({
            vip: categories.VIP?.price ?? 0,
            cat1: categories.CATEGORY_1?.price ?? 0,
            cat2: categories.CATEGORY_2?.price ?? 0,
            cat3: categories.CATEGORY_3?.price ?? 0,
          });
        }
      } catch (err) {
        console.error("Failed to load ticket prices", err);
      } finally {
        setLoading(false);
      }
    }
    loadAvailability();
  }, [matchId]);

  const totalTickets =
    ticketCounts.vip + ticketCounts.cat1 + ticketCounts.cat2 + ticketCounts.cat3;

  const handleAddToCart = async () => {
    if (totalTickets === 0) {
      setMessage("Пожалуйста, выберите хотя бы один билет.");
      return;
    }

    const ticketGroups: { key: CategoryApi; qty: number }[] = [
      { key: "VIP", qty: ticketCounts.vip },
      { key: "CATEGORY_1", qty: ticketCounts.cat1 },
      { key: "CATEGORY_2", qty: ticketCounts.cat2 },
      { key: "CATEGORY_3", qty: ticketCounts.cat3 },
    ];

    try {
      for (const t of ticketGroups) {
        if (t.qty > 0) {
          await dispatch(
            addTicketAndRefresh({ matchId, category: t.key, quantity: t.qty })
          ).unwrap();
        }
      }
      setMessage("Ваши билеты добавлены в корзину!");
      setTicketCounts({ vip: 0, cat1: 0, cat2: 0, cat3: 0 });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Ошибка при добавлении билетов:", err);
      setMessage("Ошибка при добавлении билетов.");
    }
  };

  if (loading) return <InfoText>Loading ticket prices...</InfoText>;

  const total =
    ticketCounts.vip * prices.vip +
    ticketCounts.cat1 * prices.cat1 +
    ticketCounts.cat2 * prices.cat2 +
    ticketCounts.cat3 * prices.cat3;

  return (
    <Wrapper>
      <Container>
        <SectionTitle>Tickets</SectionTitle>
        {message && <SuccessMessage>{message}</SuccessMessage>}

        <TicketTable>
          {[
            { name: "VIP", key: "vip" as const },
            { name: "Category 1", key: "cat1" as const },
            { name: "Category 2", key: "cat2" as const },
            { name: "Category 3", key: "cat3" as const },
          ].map((row) => (
            <TicketRow key={row.key}>
              <CategoryName>{row.name}</CategoryName>
              <PriceText>${prices[row.key]}</PriceText>
              <TicketInput
                type="number"
                min="0"
                max="6"
                value={ticketCounts[row.key]}
                onChange={(e) =>
                  setTicketCounts((prev) => ({
                    ...prev,
                    [row.key]: Number(e.target.value),
                  }))
                }
              />
            </TicketRow>
          ))}
        </TicketTable>

        <TotalText>Total: ${total}</TotalText>
        <AddButton>
          <Button label="Add to cart" onClick={handleAddToCart} />
        </AddButton>
      </Container>
    </Wrapper>
  );
};

export default MatchDetails;

const Wrapper = styled.div`
  background-color: #f9f9f9;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;
const SectionTitle = styled.h4`
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  color: #111;
`;
const SuccessMessage = styled.div`
  background: #e6ffed;
  border: 1px solid #a3e3b6;
  color: #217a43;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  text-align: center;
  width: 100%;
`;
const TicketTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
const TicketRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
`;
const CategoryName = styled.span`
  font-weight: 500;
  color: #222;
`;
const PriceText = styled.span`
  color: #333;
  font-weight: 500;
  text-align: center;
`;
const TicketInput = styled.input`
  justify-self: end;
  width: 70px;
  padding: 0.4rem 0.5rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
`;
const TotalText = styled.p`
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: center;
`;
const AddButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
`;
const InfoText = styled.p`
  margin: 0;
`;
























/*import { useEffect, useState } from "react";
import styled from "styled-components";
import type { FC } from "react";
import Button from "../Button/Button";
import { getMatchAvailability } from "../../services/api/matchesService";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

interface MatchDetailsProps {
  matchId: number;
  stadium: {
    name: string;
    city: string;
    countryCode: string;
  };
}

const MatchDetails: FC<MatchDetailsProps> = ({ matchId }) => {
  const [ticketCounts, setTicketCounts] = useState({vip: 0, cat1: 0, cat2: 0, cat3: 0,});
  const [prices, setPrices] = useState({vip: 0, cat1: 0, cat2: 0, cat3: 0,});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadAvailability() {
      try {
        const categories = await getMatchAvailability(matchId);
        if (categories) {
          setPrices({
            vip: categories.VIP?.price ?? 0,
            cat1: categories.CATEGORY_1?.price ?? 0,
            cat2: categories.CATEGORY_2?.price ?? 0,
            cat3: categories.CATEGORY_3?.price ?? 0,
          });
        }
      } catch (err) {
        console.error("Failed to load ticket prices", err);
      } finally {
        setLoading(false);
      }
    }
    loadAvailability();
  }, [matchId]);

  const handleTicketChange = (
    category: keyof typeof ticketCounts,
    value: number
  ) => {
    if (value >= 0 && value <= 6) {
      setTicketCounts((prev) => ({ ...prev, [category]: value }));
    }
  };

  const total =
    ticketCounts.vip * prices.vip +
    ticketCounts.cat1 * prices.cat1 +
    ticketCounts.cat2 * prices.cat2 +
    ticketCounts.cat3 * prices.cat3;

  const totalTickets =
    ticketCounts.vip +
    ticketCounts.cat1 +
    ticketCounts.cat2 +
    ticketCounts.cat3;

  const handleAddToCart = () => {
    if (totalTickets === 0) {
      setMessage("Please select at least one ticket.");
      return;
    }

    const ticketsToAdd = [
      { name: "VIP", quantity: ticketCounts.vip, price: prices.vip },
      { name: "Category 1", quantity: ticketCounts.cat1, price: prices.cat1 },
      { name: "Category 2", quantity: ticketCounts.cat2, price: prices.cat2 },
      { name: "Category 3", quantity: ticketCounts.cat3, price: prices.cat3 },
    ].filter((t) => t.quantity > 0);

    ticketsToAdd.forEach((ticket) => {
      dispatch(
        addToCart({
          id: `${matchId}-${ticket.name}`,
          matchId,
          name: ticket.name,
          quantity: ticket.quantity,
          price: ticket.price,
        })
      );
    });

    setMessage("Your tickets have been added to the shopping cart!");
    setTicketCounts({ vip: 0, cat1: 0, cat2: 0, cat3: 0 });

    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) return <InfoText>Loading ticket prices...</InfoText>;

  return (
    <Wrapper>
      <Container>
        <SectionTitle>Tickets</SectionTitle>

        {message && <SuccessMessage>{message}</SuccessMessage>}

        <TicketTable>
          <TicketRow>
            <CategoryName>VIP</CategoryName>
            <PriceText>${prices.vip}</PriceText>
            <TicketInput
              type="number"
              min="0"
              max="6"
              value={ticketCounts.vip}
              onChange={(e) => handleTicketChange("vip", Number(e.target.value))}
            />
          </TicketRow>

          <TicketRow>
            <CategoryName>Category 1</CategoryName>
            <PriceText>${prices.cat1}</PriceText>
            <TicketInput
              type="number"
              min="0"
              max="6"
              value={ticketCounts.cat1}
              onChange={(e) =>
                handleTicketChange("cat1", Number(e.target.value))
              }
            />
          </TicketRow>

          <TicketRow>
            <CategoryName>Category 2</CategoryName>
            <PriceText>${prices.cat2}</PriceText>
            <TicketInput
              type="number"
              min="0"
              max="6"
              value={ticketCounts.cat2}
              onChange={(e) =>
                handleTicketChange("cat2", Number(e.target.value))
              }
            />
          </TicketRow>

          <TicketRow>
            <CategoryName>Category 3</CategoryName>
            <PriceText>${prices.cat3}</PriceText>
            <TicketInput
              type="number"
              min="0"
              max="6"
              value={ticketCounts.cat3}
              onChange={(e) =>
                handleTicketChange("cat3", Number(e.target.value))
              }
            />
          </TicketRow>
        </TicketTable>

        <TotalText>Total: ${total}</TotalText>

        <AddButton>
          <Button label="Add to cart" onClick={handleAddToCart} />
        </AddButton>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f9f9f9;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const SectionTitle = styled.h4`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #111;
  padding-bottom: 0.3rem;
  width: fit-content;
`;

const SuccessMessage = styled.div`
  background: #e6ffed;
  border: 1px solid #a3e3b6;
  color: #217a43;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  text-align: center;
  width: 100%;
`;

const TicketTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const TicketRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr; 
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid #e4e4e4;

  &:last-child {
    border-bottom: none;
  }
`;

const CategoryName = styled.span`
  font-weight: 500;
  color: #222;
  text-align: left;
`;

const PriceText = styled.span`
  color: #333;
  font-weight: 500;
  letter-spacing: 0.2px;
`;

const TicketInput = styled.input`
  justify-self: end; 
  width: 70px;
  padding: 0.4rem 0.5rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
  }
`;


const TotalText = styled.p`
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: center;
  color: #000;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
`;

const InfoText = styled.p`
  margin: 0;
`;

export default MatchDetails;

*/

