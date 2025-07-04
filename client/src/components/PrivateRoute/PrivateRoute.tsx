import type { JSX } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  isAuthenticated: boolean;
  children: JSX.Element;
};

const PrivateRoute = ({ isAuthenticated, children }: PrivateRouteProps) => {
  if (!isAuthenticated) {
    // se non è autenticato reindirizza alla home o login
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
