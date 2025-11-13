import { PawPrint, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold mb-4">
              <PawPrint className="w-8 h-8 text-primary" />
              <span>PetzInMove</span>
            </div>
            <p className="text-background/80">
              Cuidando dos seus melhores amigos com amor e profissionalismo.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#sobre" className="text-background/80 hover:text-primary transition-colors">Sobre</a></li>
              <li><a href="#servicos" className="text-background/80 hover:text-primary transition-colors">Serviços</a></li>
              <li><a href="#agendar" className="text-background/80 hover:text-primary transition-colors">Agendar</a></li>
              <li><a href="#depoimentos" className="text-background/80 hover:text-primary transition-colors">Depoimentos</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Serviços</h3>
            <ul className="space-y-2 text-background/80">
              <li>Banho e Tosa</li>
              <li>Consulta Veterinária</li>
              <li>Day Spa Pet</li>
              <li>Vacinação</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/80">
                <Phone className="w-4 h-4" />
                <span>(11) 98765-4321</span>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <Mail className="w-4 h-4" />
                <span>contato@petzinmove.com.br</span>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>© 2024 Petz In Move. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
