import type { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuth } from "../features/auth/authSlice";

type Props = {
  children: ReactNode;
};

const RequireAuth: FC<Props> = ({ children }) => {
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();

  if (!isAuth) {
    const from = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={`/login?from=${encodeURIComponent(from)}`}
        replace
        state={{ message: "Please log in to complete your purchase." }}
      />
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
