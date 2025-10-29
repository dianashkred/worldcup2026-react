import { Link, useLocation } from 'react-router-dom';
import type { FC } from 'react';
import styled from 'styled-components';
import logoIcon from '../../assets/icons/logo.png';
import cartIcon from '../../assets/icons/cart-icon.svg';


const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 64px;
  background-color: #000;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled.img`
  height: 80px;
  margin-right: auto;
  padding-left: 30px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;
  margin-right: 100px;
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: ${(props) => (props.isActive ? '#1c26dbff' : '#ffffffff')};  font-size: 15px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  line-height: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #4b57dbff;
  }
`;

const CartContainer = styled(Link)`
  position: relative;
  background-color: #1c26dbff;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const CartIcon = styled.img`
  width: 25px;
  height: 17px;
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #fff;
  color: #000;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-weight: bold;
`;

const Header: FC = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
        <Logo  src={logoIcon} alt="Logo"/>
      <Nav>
        <NavLink to="/" isActive={location.pathname === '/'}>
          Home
        </NavLink>
        <NavLink to="/maches" isActive={location.pathname === '/menu'}>
          Matches
        </NavLink>
        <NavLink to="teams" isActive={false}>
          Teams
        </NavLink>
        <NavLink to="/groupes" isActive={false}>
          Groupes
        </NavLink>
          <NavLink to="/login" isActive={location.pathname === '/login'}>
            Login
          </NavLink>
      </Nav>
      <CartContainer to="/order">
        <CartIcon src={cartIcon} alt="Cart"/>
        <CartCount>0</CartCount>
      </CartContainer>
    </HeaderContainer>
  );
};

export default Header;