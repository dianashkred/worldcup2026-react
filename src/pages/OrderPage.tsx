import type { FC } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import OrderSection from '../components/Order/OrderSection';

const OrderPage: FC = () => {
  return(
  <>
    <Header/>
    <OrderSection/>
    <Footer/>
  </>
  );
};

export default OrderPage;