import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PawPrint } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-dog.jpg";
import { api, ApiError } from "@/lib/api";
import { authStorage } from "@/lib/auth-storage";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.senha) {
      toast({
        title: "Erro no login",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.login({
        email: formData.email,
        senha: formData.senha,
      });
      authStorage.setToken(response.token);

      toast({
        title: "Login realizado!",
        description: "Bem-vindo de volta ao Petz In Move.",
      });

      navigate("/home");
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Erro ao realizar login.";
      toast({
        title: "Erro no login",
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
            <h1 className="text-4xl font-bold mb-3">Bem-vindo de volta!</h1>
            <p className="text-xl text-muted-foreground">Entre para cuidar do seu pet</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="text-center mt-8 text-base text-muted-foreground">
            Nao tem uma conta?{" "}
            <Link to="/cadastro" className="text-primary font-semibold hover:underline">
              Cadastre-se
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
        </div>
      </div>
    </div>
  );
};

export default Login;
