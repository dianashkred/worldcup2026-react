import type { FC } from "react";
import styled from "styled-components";
import Button from "../Button/Button";

type Props = {
  total: number;
  onConfirm: () => void;
};

const CartSummary: FC<Props> = ({ total, onConfirm }) => (
  <>
    <Summary>
      <TotalLabel>Total:</TotalLabel>
      <TotalAmount>${total.toFixed(2)}</TotalAmount>
    </Summary>
    <ButtonArea>
      <Button label="Confirm Order" onClick={onConfirm} />
    </ButtonArea>
  </>
);

export default CartSummary;

const Summary = styled.div`
  display:flex;
  justify-content:flex-end;
  align-items:baseline;
  gap:10px;
  margin:20px 0 18px;
  width:100%;
  max-width:1200px;
`;
const TotalLabel = styled.span`
  font-size:1.2rem;
  font-weight:600;
  color:#000;
`;
const TotalAmount = styled.span`
  font-size:1.4rem;
  font-weight:700;
  color:#1c26dbff;
`;
const ButtonArea = styled.div`
  display:flex;
  justify-content:center;
`;
