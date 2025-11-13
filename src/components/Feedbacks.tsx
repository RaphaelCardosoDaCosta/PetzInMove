import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    pet: "Luna (Golden Retriever)",
    text: "Serviço incrível! A equipe foi muito carinhosa com a Luna e ela ficou linda depois do banho e tosa. Super recomendo!",
    rating: 5,
  },
  {
    name: "João Santos",
    pet: "Thor (Pastor Alemão)",
    text: "A consulta veterinária foi muito profissional. O veterinário explicou tudo detalhadamente e o Thor se sentiu muito confortável.",
    rating: 5,
  },
  {
    name: "Ana Costa",
    pet: "Mel (Poodle)",
    text: "O Day Spa foi maravilhoso! A Mel saiu de lá relaxada e cheirosa. A comodidade de ser em casa é sensacional!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O que dizem nossos clientes
          </h2>
          <p className="text-xl text-muted-foreground">
            Depoimentos de tutores satisfeitos com nossos serviços
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-card transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
              <div className="border-t pt-4">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.pet}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
