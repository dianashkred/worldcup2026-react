import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../features/store";
import {
  clearCart,
  selectCartTickets,
  selectCartTotal,
  type CartItem,
} from "../../features/cart/cartSlice";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import Button from "../Button/Button";
import { checkoutCartViaApi } from "../../services/api/ticketsService";

const OrderSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tickets = useSelector((s: RootState) => selectCartTickets(s));
  const total = useSelector((s: RootState) => selectCartTotal(s));

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const rows: CartItem[] = useMemo(() => tickets, [tickets]);

  const onConfirm = async () => {
    if (!rows.length || processing) return;

    setErrorMessage("");
    setSuccessMessage("");
    setProcessing(true);

    try {
      const paidTickets = await checkoutCartViaApi(rows);

      dispatch(clearCart());

      const count = paidTickets.length;
      const baseText = "Your order has been successfully confirmed and paid.";
      const withCount =
        count > 0
          ? `${baseText} You have ${count} ticket${count > 1 ? "s" : ""}.`
          : baseText;

      setSuccessMessage(withCount);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to validate your cart. Please try again.";
      setErrorMessage(message);
    } finally {
      setProcessing(false);
    }
  };

  if (rows.length === 0) {
    return (
      <SectionContainer>
        <SectionTitle>Your Cart</SectionTitle>

        {successMessage && (
          <ConfirmationMessage>{successMessage}</ConfirmationMessage>
        )}
        {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}

        <EmptyMessage>Your cart is empty.</EmptyMessage>

        <ButtonsRow>
          <Button
            label="Back to matches"
            onClick={() => navigate("/matches")}
          />
          <Button
            label="View my tickets"
            onClick={() => navigate("/tickets")}
          />
        </ButtonsRow>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionTitle>Your Cart</SectionTitle>

      <CartList items={rows} />
      <CartSummary
        total={total}
        onConfirm={onConfirm}
        disabled={processing || rows.length === 0}
        processing={processing}
      />

      {successMessage && (
        <AfterOrderBlock>
          <ConfirmationMessage>{successMessage}</ConfirmationMessage>
          <ButtonsRow>
            <Button
              label="Back to matches"
              onClick={() => navigate("/matches")}
            />
            <Button
              label="View my tickets"
              onClick={() => navigate("/tickets")}
            />
          </ButtonsRow>
        </AfterOrderBlock>
      )}

      {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
    </SectionContainer>
  );
};

export default OrderSection;

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 80px;
  padding: 80px 20px;
  min-height: 92vh;
`;

const SectionTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #000;
`;

const EmptyMessage = styled.p`
  color: #666;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 2rem;
`;

const ConfirmationMessage = styled.div`
  background: #e6ffed;
  border: 1px solid #a3e3b6;
  color: #217a43;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  margin-top: 1.2rem;
  text-align: center;
`;

const ErrorBox = styled.div`
  background-color: #c53030;
  border-radius: 6px;
  padding: 0.8rem 1rem;
  font-size: 0.95rem;
  margin-top: 1rem;
  color: #fff;
  max-width: 600px;
  text-align: center;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 1.6rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const AfterOrderBlock = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
