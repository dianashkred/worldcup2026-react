import type { FC } from "react";
import { useEffect, useState, useMemo } from "react";
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

type CountKey = "vip" | "cat1" | "cat2" | "cat3";

type Props = {
  matchId: number;
  match?: MatchSummary | null;
};

const COUNT_TO_API: Record<CountKey, CategoryApi> = {
  vip: "VIP",
  cat1: "CATEGORY_1",
  cat2: "CATEGORY_2",
  cat3: "CATEGORY_3",
};

const MatchTicketPanel: FC<Props> = ({ matchId, match }) => {
  const [counts, setCounts] = useState<Record<CountKey, number>>({ vip: 0, cat1: 0, cat2: 0, cat3: 0 });
  const [prices, setPrices] = useState<Record<CategoryApi, number>>({ VIP: 0, CATEGORY_1: 0, CATEGORY_2: 0, CATEGORY_3: 0 });
  const [availability, setAvailability] = useState<Record<CategoryApi, number>>({
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

  const totalLocal = useMemo(() => counts.vip + counts.cat1 + counts.cat2 + counts.cat3, [counts]);

  const clamp = (v: number, cap: number) => (Number.isNaN(v) || v < 0 ? 0 : v > cap ? cap : v);

  const setCount = (key: CountKey, v: number) => {
    setCounts((p) => ({ ...p, [key]: v }));
  };

  const rows = [
    { key: "vip" as const, api: COUNT_TO_API.vip, left: availability.VIP },
    { key: "cat1" as const, api: COUNT_TO_API.cat1, left: availability.CATEGORY_1 },
    { key: "cat2" as const, api: COUNT_TO_API.cat2, left: availability.CATEGORY_2 },
    { key: "cat3" as const, api: COUNT_TO_API.cat3, left: availability.CATEGORY_3 },
  ];

  const maxForRow = (key: CountKey): number => {
    const api = COUNT_TO_API[key];
    const localOthers = totalLocal - counts[key];
    const remainingByMatchWithThisRow = Math.max(0, MAX_PER_MATCH - inCartForMatch - localOthers);
    return Math.max(0, Math.min(MAX_QTY, availability[api] ?? Number.POSITIVE_INFINITY, remainingByMatchWithThisRow));
  };

  const helperForRow = (key: CountKey): { text: string; kind: "ok" | "warn" } => {
    const cap = maxForRow(key);
    const remainingHere = Math.max(0, cap - counts[key]);
    if (cap === 0) return { text: `Match limit reached (${MAX_PER_MATCH})`, kind: "warn" };
    if (remainingHere === 0) return { text: `Match limit reached (${MAX_PER_MATCH})`, kind: "warn" };
    return { text: `You can add up to ${remainingHere}`, kind: "ok" };
  };

  const handleAddToCart = async () => {
    const groups: { key: CategoryApi; qty: number }[] = [
      { key: "VIP", qty: counts.vip },
      { key: "CATEGORY_1", qty: counts.cat1 },
      { key: "CATEGORY_2", qty: counts.cat2 },
      { key: "CATEGORY_3", qty: counts.cat3 },
    ];
    const totalQty = groups.reduce((s, g) => s + g.qty, 0);
    if (totalQty === 0) {
      setMessage("Please select at least one ticket.");
      setTimeout(() => setMessage(null), 2000);
      return;
    }
    try {
      for (const g of groups) {
        if (g.qty > 0) {
          const key: CountKey = g.key === "VIP" ? "vip" : g.key === "CATEGORY_1" ? "cat1" : g.key === "CATEGORY_2" ? "cat2" : "cat3";
          const safeQty = clamp(g.qty, maxForRow(key));
          if (safeQty > 0) {
            await dispatch(addTicketWithMatchData(matchId, g.key, safeQty, prices[g.key], match ?? null));
          }
        }
      }
      setMessage("Tickets added to cart!");
      setCounts({ vip: 0, cat1: 0, cat2: 0, cat3: 0 });
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage("Error when adding tickets.");
      setTimeout(() => setMessage(null), 2500);
    }
  };

  if (loading) return <InfoText>Loading ticket prices...</InfoText>;

  const total = (["vip", "cat1", "cat2", "cat3"] as CountKey[]).reduce(
    (s, k) => s + counts[k] * prices[COUNT_TO_API[k]],
    0
  );

  return (
    <Wrapper>
      <Container>
        <SectionTitle>Tickets</SectionTitle>
        {message && <SuccessMessage>{message}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <TicketTable>
          {rows.map((row) => {
            const cap = maxForRow(row.key);
            const helper = helperForRow(row.key);
            return (
              <TicketRow key={row.key}>
                <LeftCol>
                  <CategoryName>{formatCategoryLabel(row.api)}</CategoryName>
                  <LeftSub>({row.left === Number.POSITIVE_INFINITY ? "∞" : `${row.left} left`})</LeftSub>
                </LeftCol>

                <PriceText>${prices[row.api].toFixed(0)}</PriceText>

                <QtyBox>
                  <QtyStepper
                    value={counts[row.key]}
                    max={cap}
                    onChange={(v) => setCount(row.key, clamp(v, cap))}
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
  gap: 1.2rem;
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


