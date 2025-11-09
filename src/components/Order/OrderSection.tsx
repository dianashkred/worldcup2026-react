import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useMemo, useState } from "react";
import type { RootState } from "../../features/store";
import { clearCart, selectCartTickets, selectCartTotal } from "../../features/cart/cartSlice";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import Button from "../Button/Button";

const OrderSection = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((s: RootState) => selectCartTickets(s));
  const total = useSelector((s: RootState) => selectCartTotal(s));
  const [message, setMessage] = useState("");
  const rows = useMemo(() => tickets, [tickets]);

  const onConfirm = () => {
    setMessage("Your order has been successfully confirmed!");
    dispatch(clearCart());
    setTimeout(() => setMessage(""), 3000);
  };

  if (rows.length === 0) {
    return (
      <SectionContainer>
        <SectionTitle>Your Cart</SectionTitle>
        <EmptyMessage>Your cart is empty.</EmptyMessage>
        <Button label="Return" onClick={() => window.location.href = '/matches'} />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionTitle>Your Cart</SectionTitle>
      <CartList items={rows} />
      <CartSummary total={total} onConfirm={onConfirm} />
      {message && <ConfirmationMessage>{message}</ConfirmationMessage>}
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


