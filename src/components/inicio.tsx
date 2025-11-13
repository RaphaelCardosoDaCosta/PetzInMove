import { Button } from "@/components/ui/button";
import { Calendar, Info } from "lucide-react";
import heroImage from "@/assets/hero-dog.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-3xl text-center mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Pet Shop Móvel Premium
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Cuidados profissionais para seu pet, com a comodidade de ir até você. 
            Agendamento fácil, serviços de qualidade, amor em cada visita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#agendar">
              <Button size="lg" className="text-lg px-8">
                <Calendar className="mr-2" />
                Agendar Agora
              </Button>
            </a>
            <a href="#sobre">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Info className="mr-2" />
                Saiba Mais
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
