/*
import styled from "styled-components";
import { useEffect, useState } from "react";
import type { FC } from 'react';
import { useParams } from "react-router-dom";
import { getMatchById } from "../../services/api/matchesService";
import type { Match } from "../../Types/Match";
import type { MatchCategory } from "../../Types/MatchCategory";
import Button  from "../Button/Button";
import { useCart } from "../../context/CartContext";

const MatchDetails: FC = () => {
  const { id } = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) getMatchById(Number(id)).then(setMatch);
  }, [id]);

  const handleQuantityChange = (category: string, value: number) => {
    setQuantities(prev => ({ ...prev, [category]: value }));
  };

  const handleAddToCart = () => {
    if (!match) return;
    Object.entries(quantities).forEach(([category, qty]) => {
      if (qty > 0) {
        const price = match.categories[category].price;
        addToCart({ matchId: match.id, category, quantity: qty, price });
      }
    });
    alert("Billets ajoutés au panier !");
  };

  if (!match) return <Loading>Chargement...</Loading>;

  const { homeTeam, awayTeam, stadium, categories } = match;

  return (
    <Container>
      <Title>Match</Title>
      <MatchInfo>
        <HeaderRow>
          <span>{homeTeam.name}</span>
          <span>VS</span>
          <span>{awayTeam.name}</span>
          <span>Date</span>
          <span>Heure</span>
          <span>Lieu</span>
        </HeaderRow>
        <p>Adresse : {stadium.name}, {stadium.city}, {stadium.country}</p>
      </MatchInfo>

      <SectionTitle>Places :</SectionTitle>
      {Object.entries(categories).map(([catName, cat]: [string, MatchCategory]) => (
        <Row key={catName}>
          <span>{catName}</span>
          <span>{cat.price} €</span>
          <QuantityInput
            type="number"
            min={0}
            max={6}
            value={quantities[catName] || 0}
            onChange={e => handleQuantityChange(catName, Number(e.target.value))}
          />
        </Row>
      ))}

      <AddButton>
        <Button label="Ajouter au panier" onClick={handleAddToCart} />
      </AddButton>
    </Container>
  );
};
export default MatchDetails;

const Container = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const MatchInfo = styled.div`
  background: #1b1b1b;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SectionTitle = styled.h2`
  background: #444;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 80px;
  align-items: center;
  margin-bottom: 0.6rem;
  font-size: 1rem;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid #666;
  text-align: center;
  background: #222;
  color: #fff;
`;

const AddButton = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
`;

const Loading = styled.div`
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
`;

*/