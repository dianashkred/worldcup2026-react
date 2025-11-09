import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../features/store";
import { getMatchAvailability } from "../../services/api/matchesService";
import type { CategoryApi } from "../../Types/Match";
import { addTicketWithMatchData, selectCountByMatch } from "../../features/cart/cartSlice";
import { formatCategoryLabel } from "../../utils/categoryLabel";
import Button from "../Button/Button";
import QtyStepper from "../QtyInput/QtyStepper";
import type { MatchSummary } from "../../features/cart/cartSlice";
import { MAX_PER_CATEGORY as MAX_QTY, MAX_PER_MATCH } from "../../constants/tickets";

const CATEGORY_ORDER = ["VIP", "CATEGORY_1", "CATEGORY_2", "CATEGORY_3"] as const;
type CategoryOrderTuple = typeof CATEGORY_ORDER;
type CategoryKey = CategoryOrderTuple[number]; // равен CategoryApi

type Props = {
  matchId: number;
  match?: MatchSummary | null;
};

const ZERO_COUNTS: Record<CategoryKey, number> = {
  VIP: 0,
  CATEGORY_1: 0,
  CATEGORY_2: 0,
  CATEGORY_3: 0,
};

const MatchTicketPanel: FC<Props> = ({ matchId, match }) => {
  const [counts, setCounts] = useState<Record<CategoryKey, number>>({ ...ZERO_COUNTS });
  const [prices, setPrices] = useState<Record<CategoryKey, number>>({ ...ZERO_COUNTS });
  const [availability, setAvailability] = useState<Record<CategoryKey, number>>({
    VIP: Number.POSITIVE_INFINITY,
    CATEGORY_1: Number.POSITIVE_INFINITY,
    CATEGORY_2: Number.POSITIVE_INFINITY,
    CATEGORY_3: Number.POSITIVE_INFINITY,
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const inCartForMatch = useSelector((s: RootState) => selectCountByMatch(s, matchId));

  useEffect(() => {
    (async () => {
      try {
        const categories = await getMatchAvailability(matchId);
        if (categories) {
          setPrices({
            VIP: categories.VIP?.price ?? 0,
            CATEGORY_1: categories.CATEGORY_1?.price ?? 0,
            CATEGORY_2: categories.CATEGORY_2?.price ?? 0,
            CATEGORY_3: categories.CATEGORY_3?.price ?? 0,
          });
          setAvailability({
            VIP: categories.VIP?.availableSeats ?? Number.POSITIVE_INFINITY,
            CATEGORY_1: categories.CATEGORY_1?.availableSeats ?? Number.POSITIVE_INFINITY,
            CATEGORY_2: categories.CATEGORY_2?.availableSeats ?? Number.POSITIVE_INFINITY,
            CATEGORY_3: categories.CATEGORY_3?.availableSeats ?? Number.POSITIVE_INFINITY,
          });
        }
      } catch {
        setError("Failed to load ticket prices.");
        setTimeout(() => setError(null), 2500);
      } finally {
        setLoading(false);
      }
    })();
  }, [matchId]);

  const totalLocal = useMemo(
    () => CATEGORY_ORDER.reduce((s, k) => s + counts[k], 0),
    [counts]
  );

  const clamp = (v: number, cap: number) => (Number.isNaN(v) || v < 0 ? 0 : v > cap ? cap : v);

  const setCount = (key: CategoryKey, v: number) => {
    setCounts((p) => ({ ...p, [key]: v }));
  };

  const maxFor = (key: CategoryKey): number => {
    const localOthers = totalLocal - counts[key];
    const remainingByMatch = Math.max(0, MAX_PER_MATCH - inCartForMatch - localOthers);
    return Math.max(0, Math.min(MAX_QTY, availability[key] ?? Number.POSITIVE_INFINITY, remainingByMatch));
  };

  const helperFor = (key: CategoryKey): { text: string; kind: "ok" | "warn" } => {
    const cap = maxFor(key);
    const remainingHere = Math.max(0, cap - counts[key]);

    if (cap === 0 || remainingHere === 0) {
      return { text: `Match limit reached (${MAX_PER_MATCH})`, kind: "warn" };
    }

    return { text: `You can add up to ${remainingHere}`, kind: "ok" };
  };

  const handleAddToCart = async () => {
    const totalQty = CATEGORY_ORDER.reduce((s, k) => s + counts[k], 0);
    if (totalQty === 0) {
      setMessage("Please select at least one ticket.");
      setTimeout(() => setMessage(null), 2000);
      return;
    }

    try {
      for (const k of CATEGORY_ORDER) {
        const qty = counts[k];
        if (qty > 0) {
          const safeQty = clamp(qty, maxFor(k));
          if (safeQty > 0) {
            await dispatch(addTicketWithMatchData(matchId, k as CategoryApi, safeQty, prices[k], match ?? null));
          }
        }
      }
      setMessage("Tickets added to cart!");
      setCounts({ ...ZERO_COUNTS });
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage("Error when adding tickets.");
      setTimeout(() => setMessage(null), 2500);
    }
  };

  if (loading) return <InfoText>Loading ticket prices...</InfoText>;

  const total = CATEGORY_ORDER.reduce((s, k) => s + counts[k] * prices[k], 0);

  return (
    <Wrapper>
      <Container>
        <SectionTitle>Tickets</SectionTitle>
        {message && <SuccessMessage>{message}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <TicketTable>
          {CATEGORY_ORDER.map((key) => {
            const cap = maxFor(key);
            const helper = helperFor(key);
            const left = availability[key];

            return (
              <TicketRow key={key}>
                <LeftCol>
                  <CategoryName>{formatCategoryLabel(key)}</CategoryName>
                  <LeftSub>({left === Number.POSITIVE_INFINITY ? "∞" : `${left} left`})</LeftSub>
                </LeftCol>

                <PriceText>${prices[key].toFixed(0)}</PriceText>

                <QtyBox>
                  <QtyStepper
                    value={counts[key]}
                    max={cap}
                    onChange={(v) => setCount(key, clamp(v, cap))}
                  />
                </QtyBox>

                <HelperLine data-kind={helper.kind}>{helper.text}</HelperLine>
              </TicketRow>
            );
          })}
        </TicketTable>

        <TotalText>Total: ${total}</TotalText>
        <AddButton>
          <Button label="Add to cart" onClick={handleAddToCart} />
        </AddButton>
      </Container>
    </Wrapper>
  );
};

export default MatchTicketPanel;

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
  margin: 0 auto;
  max-width: 760px;
`;

const SectionTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 0.2rem;
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

const ErrorMessage = styled.div`
  background: #ffecec;
  border: 1px solid #ffb3b3;
  color: #a11919;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  text-align: center;
  width: 100%;
`;

const TicketTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const TicketRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto 18px;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid #ececec;
  &:last-child { border-bottom: none; }
`;

const LeftCol = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

const CategoryName = styled.span`
  font-weight: 600;
  color: #222;
`;

const LeftSub = styled.span`
  color: #777;
  font-size: 0.9rem;
`;

const PriceText = styled.span`
  color: #333;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

const QtyBox = styled.div`
  justify-self: end;
  width: 180px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const HelperLine = styled.div`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  justify-self: end;
  font-size: 0.9rem;
  min-height: 18px;
  line-height: 18px;
  color: #6b7280;
  &[data-kind="warn"] { color: #d32f2f; }
`;

const TotalText = styled.p`
  font-weight: 800;
  font-size: 1.25rem;
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
