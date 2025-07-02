import React from "react";
import TopNavbar from "../navbar/TopNavbar";
import { Outlet } from "react-router-dom";

const AuthenticatedLayoutWithTopNavbar = ({
  setIsAuthenticated,
}: {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <TopNavbar setIsAuthenticated={setIsAuthenticated} />
      <Outlet />
    </>
  );
};

export default AuthenticatedLayoutWithTopNavbar;
