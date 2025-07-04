import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Hero from "./components/hero/Hero";
import HowItWorks from "./components/howitworks/HowItWorks";
import WhyUs from "./components/whyus/WhyUs";
import Pricing from "./components/pricing/Pricing";
import Footer from "./components/footer/Footer";
import Ready from "./components/ready/Ready";
import Stats from "./components/stats/Stats";
import RegisterForm from "./components/formModal/RegisterForm";
import LoginForm from "./components/formModal/LoginForm";

import BusinessProfile from "./page/complete-profile/BusinessProfile";
import WorkerProfile from "./page/complete-profile/WorkerProfile";

import JobList from "./components/jobs/JobList";
import JobForm from "./page/new-job/JobForm";
import Main from "./page/main/Main";
import Dashboard from "./page/dashboard/Dashboard";
import MyProfile from "./page/my-profile/MyProfile";

import NoNavbarLayout from "./components/layout/NoNavbarLayout";
import PublicLayout from "./components/layout/PublicLayout";
import AuthenticatedLayoutWithTopNavbar from "./components/layout/AuthenticatedLayoutWithTopNavbar";
import Messages from "./components/message/Messages";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userType, setUserType] = useState<"business" | "worker" | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);
  const openRegisterAsBusiness = () => setUserType("business");
  const openRegisterAsWorker = () => setUserType("worker");
  const closeRegisterModal = () => setUserType(null);

  return (
    <>
      <Routes>
        {/* No Navbar Layout */}
        <Route element={<NoNavbarLayout />}>
          <Route path="/complete-profile/business" element={<BusinessProfile />} />
          <Route path="/complete-profile/worker" element={<WorkerProfile />} />
        </Route>

        {/* Authenticated routes */}
        <Route
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AuthenticatedLayoutWithTopNavbar setIsAuthenticated={setIsAuthenticated} />
            </PrivateRoute>
          }
        >
          <Route path="/jobs" element={<JobList />} />
          <Route path="/post-new-job" element={<JobForm />} />
          <Route path="/main" element={<Main />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/messages" element={<Messages />} />
        </Route>

        {/* Public routes with top Navbar */}
        <Route element={<PublicLayout openLoginModal={openLoginModal} />}>
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
        </Route>
      </Routes>

      {/* Modals */}
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
