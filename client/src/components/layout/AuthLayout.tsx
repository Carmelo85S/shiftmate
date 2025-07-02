import { Outlet } from "react-router-dom";
import AuthenticatedNavbar from "../navbar/TopNavbar";

interface AuthenticatedLayoutProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthenticatedLayout = ({ setIsAuthenticated }: AuthenticatedLayoutProps) => (
  <>
    <AuthenticatedNavbar setIsAuthenticated={setIsAuthenticated} />
    <div className="pt-6">
      <Outlet />
    </div>
  </>
);

export default AuthenticatedLayout;
