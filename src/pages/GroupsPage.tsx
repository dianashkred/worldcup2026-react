import type { FC } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import GroupsPageComponent from '../components/Groups/GroupsPageComponent';
import styled from 'styled-components';


const GroupsPage: FC = () => {
  return(
  <>
    <Header/>
    <Container>
      <GroupsPageComponent/>
    </Container>
    <Footer/>
  </>
  );
};

export default GroupsPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;  /* empile les éléments verticalement */
  align-items: center;     /* centre horizontalement */
  justify-content: flex-start; /* aligne en haut de la page */
  min-height: 100vh;       /* prend toute la hauteur, sans forcer à coller en bas */
  padding-top: 160px;      /* laisse de l’espace sous le header fixe (ajuste la valeur selon sa hauteur) */
  gap: 20px;               /* espace entre les boutons */
`;