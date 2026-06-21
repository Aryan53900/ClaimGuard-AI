import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyChoose from "../components/WhyChoose";
import Footer from "../components/Footer";

export default function Home() {
    return (
      <div className="page">
  
        <Navbar />
  
        <Hero />
  
        <Services />
  
        <WhyChoose />
  
        <Footer />
  
      </div>
    );
  }