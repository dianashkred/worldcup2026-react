import type { FC } from 'react';
import Button from '../Button/Button';
import styled from 'styled-components';


const HomeMainSection: FC = () => {
  return (
    <Container>
      <Button label="Matches" to='/matches'/>
      <Button label="Teams" to='/teams'/>
      <Button label="Groups" to='/group'/>
      <Button label= "Sign up" to='/login'/>
      
    </Container>
    
  )
};  
export default HomeMainSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;  // stack items vertically
  align-items: center;     // center horizontally
  justify-content: center; // center vertically
  height: 100vh;           // full viewport height
  gap: 20px;               // space between buttons
`;
