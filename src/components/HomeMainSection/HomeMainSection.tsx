import type { FC } from 'react';
import Button from '../Button/Button';
import styled from 'styled-components';
import fifa26 from '../../assets/images/home/fifa26.jpg'
import weAre26 from '../../assets/images/home/weAre26.jpg'


const HomeMainSection: FC = () => {
  return (
    <MainSection>
      <Wrapper>
        <StyledImage src={fifa26} alt="Fifa 26 logo " />
        <Container>

          <Button label="Matches" to='/matches' />
          <Button label="Teams" to='/teams' />
          <Button label="Groups" to='/groups' />
          <Button label="Sign up" to='/login' />
        </Container>
        <StyledImage src={weAre26} alt="We are 26 " />
      </Wrapper>
    </MainSection>

  )
};
export default HomeMainSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;  
  align-items: center;     
  justify-content: center; 
  height: 100vh;           
  gap: 20px;               
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 0 3rem;
  background: #f5f5f5;
  overflow: hidden;

  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
    padding: 2rem 1rem;
    gap: 2rem;
  }
`;

const StyledImage = styled.img`
  width: 35%;
  max-width: 400px;
  height: auto;
  object-fit: contain;

  @media (max-width: 900px) {
    width: 60%;
    max-width: 300px;
  }
`;

const MainSection = styled.div`
  margin-top: 60px; 
`;