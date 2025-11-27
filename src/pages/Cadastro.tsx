import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PawPrint } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-dog.jpg";
import { api, ApiError } from "@/lib/api";

const Cadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.senha) {
      toast({
        title: "Erro no cadastro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    if (formData.senha.length < 6) {
      toast({
        title: "Senha fraca",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await api.criarCadastro({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
      });

      toast({
        title: "Cadastro realizado!",
        description: "Bem-vindo ao Petz In Move. Voce ja pode fazer login.",
      });

      navigate("/login");
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Erro ao realizar cadastro.";
      toast({
        title: "Erro no cadastro",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold text-primary mb-12">
            <PawPrint className="w-10 h-10" />
            <span>PetzInMove</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">Criar conta</h1>
            <p className="text-xl text-muted-foreground">Cadastre-se para comecar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">Nome completo</Label>
              <Input
                id="name"
                placeholder=""
                className="h-12"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                className="h-12"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder=""
                className="h-12"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base" size="lg" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>

          <p className="text-center mt-8 text-base text-muted-foreground">
            Ja tem uma conta?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Faca login
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image with text */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="relative z-10 text-center px-8">
          <h2 className="text-5xl font-bold text-white mb-4">
            Cuidando dos seus<br />melhores amigos
          </h2>
          <p className="text-3xl text-white/90">
            O melhor para o seu pet, sempre!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
