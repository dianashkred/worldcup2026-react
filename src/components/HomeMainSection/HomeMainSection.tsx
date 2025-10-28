import type { FC } from 'react';
import { Link} from 'react-router-dom';
import styled from 'styled-components';

const HomeMainSection: FC = () => {
  return (
    <>
      <section>
        <h1>Welcome to World Cup 2026</h1>
      </section>
      
      <Container>
        <ButtonLink to="/matches">Matches</ButtonLink>
        <ButtonLink to="/groups">Groups</ButtonLink>
        <ButtonLink to="/teams">Teams</ButtonLink>
      </Container>
      
    </>
   

  );
};  
export default HomeMainSection;

  const ButtonLink= styled(Link)`
    text-decoration: none;
    color: white;
    background-color: #007bff;
    padding: 10px 30px;
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
    width: 150px;
    &:hover {
    background-color: #0056b3; // darker on hover
  }
    `;
  const Container=styled.div`
    display: flex;
    flex-direction: column;  
    align-items: center;     
    justify-content: center; 
    height: 100vh;           
    gap: 20px;               
`;