import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Hero from "./components/hero/Hero";
import HowItWorks from "./components/howitworks/HowItWorks";
import Navbar from "./components/navbar/Navbar";
import WhyUs from "./components/whyus/WhyUs";
import Pricing from "./components/pricing/Pricing";
import Footer from "./components/footer/Footer";
import Ready from "./components/ready/Ready";
import Stats from "./components/stats/Stats";
import RegisterForm from "./components/formModal/RegisterForm";
import LoginForm from "./components/formModal/LoginForm";

import BusinessProfile from "./page/complete-profile/BusinessProfile";
import WorkerProfile from "./page/complete-profile/WorkerProfile";
import AuthenticatedNavbar from "./components/navbar/AuthenticatedNavbar";

const App = () => {
  const location = useLocation(); // ✅ Importante
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userType, setUserType] = useState<"business" | "worker" | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);
  const openRegisterAsBusiness = () => setUserType("business");
  const openRegisterAsWorker = () => setUserType("worker");
  const closeRegisterModal = () => setUserType(null);

  // ✅ Rotte dove la navbar NON deve comparire
  const hideNavbarRoutes = [
    "/complete-profile/business",
    "/complete-profile/worker",
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && (
        isAuthenticated
          ? <AuthenticatedNavbar setIsAuthenticated={setIsAuthenticated} />
          : <Navbar openLoginModal={openLoginModal} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero
                openModalAsBusiness={openRegisterAsBusiness}
                openModalAsWorker={openRegisterAsWorker}
              />
              <Stats />
              <WhyUs />
              <HowItWorks />
              <Pricing />
              <Ready />
              <Footer />
            </>
          }
        />
        <Route path="/complete-profile/business" element={<BusinessProfile />} />
        <Route path="/complete-profile/worker" element={<WorkerProfile />} />
      </Routes>

      {isLoginOpen && (
        <LoginForm
          setIsOpen={closeLoginModal}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}

      {userType && (
        <RegisterForm
          setIsOpen={closeRegisterModal}
          setIsAuthenticated={setIsAuthenticated}
          userType={userType}
        />
      )}
    </>
  );
};

export default App;
