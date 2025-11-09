import type { FC } from "react";
import styled from "styled-components";
import CartItemCard from "./CartItemCard";
import type { CartItem } from "../../features/cart/cartSlice";

type Props = { items: CartItem[] };

const CartList: FC<Props> = ({ items }) => (
  <Cards>
    {items.map((it) => (
      <CartItemCard key={`${it.matchId}-${it.category}`} item={it} />
    ))}
  </Cards>
);

export default CartList;

const Cards = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
