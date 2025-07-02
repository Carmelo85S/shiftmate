import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

const PublicLayout = ({ openLoginModal }: { openLoginModal: () => void }) => {
  return (
    <>
      <Navbar openLoginModal={openLoginModal} />
      <Outlet /> {/* nested routes will render here */}
    </>
  );
};

export default PublicLayout;

// This layout is for public routes that do not require authentication
// It includes the Navbar and renders nested routes using Outlet
// The Navbar can open the login modal when the user clicks the login button        