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
import LoginForm from "./components/formModal/LoginForm"; // <-- crea questo

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userType, setUserType] = useState<"business" | "worker" | null>(null);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openRegisterAsBusiness = () => setUserType("business");
  const openRegisterAsWorker = () => setUserType("worker");
  const closeRegisterModal = () => setUserType(null);

  return (
    <div>
      <Navbar openLoginModal={openLoginModal} />
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

      {isLoginOpen && <LoginForm setIsOpen={closeLoginModal} />}
      {userType && <RegisterForm setIsOpen={closeRegisterModal} userType={userType} />}
    </div>
  );
};

export default App;
