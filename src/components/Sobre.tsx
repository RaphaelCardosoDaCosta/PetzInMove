import { Card } from "@/components/ui/card";
import { Truck, Clock, Heart, Award } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Atendimento Móvel",
    description: "Levamos toda estrutura até sua casa com conforto e segurança",
  },
  {
    icon: Clock,
    title: "Horários Flexíveis",
    description: "Agende no melhor horário para você e seu pet",
  },
  {
    icon: Heart,
    title: "Carinho e Cuidado",
    description: "Tratamos cada pet com amor e atenção individualizada",
  },
  {
    icon: Award,
    title: "Profissionais Qualificados",
    description: "Equipe experiente e certificada em cuidados com pets",
  },
];

const About = () => {
  return (
    <section id="sobre" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre o PetzInMove
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Somos especializados em levar cuidados premium para seu pet, onde quer que você esteja. 
            Com equipamentos de última geração e uma equipe apaixonada, garantimos o melhor para seu amigo de quatro patas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 text-center hover:shadow-card transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
