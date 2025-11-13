import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";
import heroImage from "@/assets/hero-dog.jpg";

const Welcome = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-8">
            <PawPrint className="w-16 h-16 text-white" />
            <h1 className="text-6xl font-bold text-white">PetzInMove</h1>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-6">
            Bem-vindo ao PetzInMove
          </h2>
          
          <p className="text-2xl text-white/90 mb-12">
            O melhor lugar para cuidar do seu melhor amigo!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="text-lg px-12 py-6 h-auto">
                Fazer Login
              </Button>
            </Link>
            <Link to="/cadastro">
              <Button size="lg" className="text-lg px-12 py-6 h-auto">
                Criar Conta
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
