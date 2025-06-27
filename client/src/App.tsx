import Hero from "./components/hero/Hero";
import HowItWorks from "./components/howitworks/HowItWorks";
import Navbar from "./components/navbar/Navbar";
import WhyUs from "./components/whyus/WhyUs";
import Pricing from "./components/pricing/Pricing";
import Footer from "./components/footer/Footer";
import Ready from "./components/ready/Ready";
import Stats from "./components/stats/Stats";

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Stats />
      <WhyUs />
      <HowItWorks />
      <Pricing />
      <Ready />
      <Footer />
    </div>
  );
};

export default App;
