import Header from "@/components/Header";
import Hero from "@/components/inicio";
import About from "@/components/Sobre";
import Services from "@/components/Services";
import Booking from "@/components/Booking";
import Testimonials from "@/components/Feedbacks";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Booking />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
