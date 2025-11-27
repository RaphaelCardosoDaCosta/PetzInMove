import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import groomingImage from "@/assets/service-grooming.jpg";
import vetImage from "@/assets/service-vet.jpg";
import spaImage from "@/assets/service-spa.jpg";
import { api, Servico } from "@/lib/api";

const fallbackServices: Servico[] = [
  {
    id: 1,
    nome: "Banho e Tosa",
    descricao: "Banho completo, tosa higienica ou estetica",
    preco: 80,
  },
  {
    id: 2,
    nome: "Consulta Veterinaria",
    descricao: "Check-up completo, vacinacao e orientacoes de saude",
    preco: 150,
  },
  {
    id: 3,
    nome: "Day Spa Pet",
    descricao: "Tratamento premium com massagem, hidratacao e muito mais",
    preco: 200,
  },
];

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const Services = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["servicos"],
    queryFn: api.listarServicos,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const services = useMemo(() => {
    if (!isLoading && data && Array.isArray(data) && data.length > 0) {
      return data;
    }
    return fallbackServices;
  }, [data, isLoading]);

  const resolveImage = (service: Servico, index: number) => {
    if (!service?.nome) {
      const library = [groomingImage, vetImage, spaImage];
      return library[index % library.length];
    }
    const normalized = service.nome.toLowerCase();
    if (normalized.includes("banho") || normalized.includes("tosa")) {
      return groomingImage;
    }
    if (normalized.includes("consulta") || normalized.includes("veter")) {
      return vetImage;
    }
    if (normalized.includes("spa")) {
      return spaImage;
    }
    const library = [groomingImage, vetImage, spaImage];
    return library[index % library.length];
  };

  return (
    <section id="servicos" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nossos Servicos
          </h2>
          <p className="text-xl text-muted-foreground">
            Oferecemos uma gama completa de servicos para manter seu pet feliz e saudavel
          </p>
          {isError && (
            <p className="text-sm text-destructive mt-2">
              Nao foi possivel carregar os servicos atualizados. Exibindo valores de referencia.
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.id ?? index}
              className="overflow-hidden hover:shadow-card transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={resolveImage(service, index)} 
                  alt={service.nome || "Servico"}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{service.nome || "Servico"}</h3>
                <p className="text-muted-foreground mb-4">{service.descricao || "Descricao nao disponivel"}</p>
                <p className="text-primary font-bold text-xl mb-4">
                  {isLoading && !data ? "Carregando..." : formatter.format(Number(service.preco || 0))}
                </p>
                <a href="#agendar">
                  <Button className="w-full">Agendar</Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
