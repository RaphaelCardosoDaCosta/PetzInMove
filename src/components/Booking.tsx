import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Agendamento {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

const Booking = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // TODO: Adicionar useEffect para buscar agendamentos do backend
  // useEffect(() => {
  //   const fetchAgendamentos = async () => {
  //     try {
  //       const response = await axios.get('/api/agendamentos');
  //       setAgendamentos(response.data);
  //     } catch (error) {
  //       console.error('Erro ao buscar agendamentos:', error);
  //     }
  //   };
  //   fetchAgendamentos();
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.service ||
      !formData.date ||
      !formData.time
    ) {
      toast({
        title: "Erro no agendamento",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Enviar para o backend
    // try {
    //   const response = await axios.post('/api/agendamentos', formData);
    //   const novoAgendamento = response.data;
    //   setAgendamentos([...agendamentos, novoAgendamento]);
    // } catch (error) {
    //   console.error('Erro ao criar agendamento:', error);
    //   return;
    // }

    // Simulação: adicionar localmente enquanto não há backend
    const novoAgendamento: Agendamento = {
      id: Date.now().toString(),
      ...formData,
    };
    setAgendamentos([...agendamentos, novoAgendamento]);

    toast({
      title: "Agendamento confirmado!",
      description: `${formData.name}, seu agendamento foi realizado com sucesso para ${formData.date} às ${formData.time}.`,
    });

    setFormData({
      name: "",
      phone: "",
      service: "",
      date: "",
      time: "",
    });
  };

  return (
    <section id="agendar" className="py-24 bg-muted">
      <div className="container mx-105 px-4 mb-4 flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              Ver Agendamentos ({agendamentos.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Lista de Agendamentos</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {agendamentos.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum agendamento encontrado.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Horário</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agendamentos.map((agendamento) => (
                      <TableRow key={agendamento.id}>
                        <TableCell>{agendamento.name}</TableCell>
                        <TableCell>{agendamento.phone}</TableCell>
                        <TableCell>
                          {agendamento.service === "banho-tosa" &&
                            "Banho e Tosa"}
                          {agendamento.service === "consulta" &&
                            "Consulta Veterinária"}
                          {agendamento.service === "spa" && "Day Spa Pet"}
                        </TableCell>
                        <TableCell>
                          {new Date(agendamento.date).toLocaleDateString(
                            "pt-BR"
                          )}
                        </TableCell>
                        <TableCell>{agendamento.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-between items-center mb-7">
            <h2 className="text-4xl md:text-5xl font-bold flex-1">
              Agende Agora
            </h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Escolha o melhor dia e horário para cuidar do seu pet
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-8 shadow-card animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Tutor</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Serviço Desejado</Label>
              <Select
                value={formData.service}
                onValueChange={(value) =>
                  setFormData({ ...formData, service: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="banho-tosa">Banho e Tosa</SelectItem>
                  <SelectItem value="consulta">Consulta Veterinária</SelectItem>
                  <SelectItem value="spa">Day Spa Pet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Data do Agendamento</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) =>
                    setFormData({ ...formData, time: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">08:00</SelectItem>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                    <SelectItem value="17:00">17:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Confirmar Agendamento
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Booking;
