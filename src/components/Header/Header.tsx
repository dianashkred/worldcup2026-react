import { Link, useLocation, useNavigate } from "react-router-dom";
import type { FC } from "react";
import styled from "styled-components";
import logoIcon from "../../assets/icons/logo.png";
import cartIcon from "../../assets/icons/cart-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount } from "../../features/cart/cartSlice";
import type { RootState, AppDispatch } from "../../features/store";
import { logout, selectIsAuth, selectUser } from "../../features/auth/authSlice";

const Header: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartCount = useSelector((s: RootState) => selectCartCount(s));
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <HeaderContainer>
      <Logo src={logoIcon} alt="Logo" onClick={() => navigate("/")} />
      <Nav>
        <NavLink to="/" $isActive={location.pathname === "/"}>
          Home
        </NavLink>
        <NavLink to="/matches" $isActive={location.pathname === "/matches"}>
          Matches
        </NavLink>
        <NavLink to="/teams" $isActive={location.pathname === "/teams"}>
          Teams
        </NavLink>
        <NavLink to="/groups" $isActive={location.pathname === "/groups"}>
          Groups
        </NavLink>

        {isAuth && user ? (
          <>
            <NavLink to="/tickets" $isActive={location.pathname === "/tickets"}>
            {user.firstname}
            </NavLink>
            <LogoutLink onClick={handleLogout}>Logout</LogoutLink>
          </>
        ) : (
          <NavLink to="/login" $isActive={location.pathname === "/login"}>
            Login
          </NavLink>
        )}
      </Nav>

      <CartContainer to="/order">
        <CartIcon src={cartIcon} alt="cart" />
        <CartCount>{cartCount}</CartCount>
      </CartContainer>
    </HeaderContainer>
  );
};

export default Header;

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
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;
  margin-right: 100px;
  align-items: center;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${(props) => (props.$isActive ? "#1c26dbff" : "#ffffffff")};
  text-decoration: none;
  font-size: 15px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  line-height: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #4b57dbff;
  }
`;

const LogoutLink = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    color: #ff6666;
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

