import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { api, Agendamento, AgendamentoPayload, ApiError, Servico } from "@/lib/api";
import { authStorage } from "@/lib/auth-storage";

const initialFormState = {
  nome: "",
  telefone: "",
  data: "",
  hora: "",
  idServico: "",
};

const fallbackServicos: Servico[] = [
  {
    id: 1,
    nome: "Banho e Tosa",
    descricao: "Servico referencia para demonstracao",
    preco: 80,
  },
  {
    id: 2,
    nome: "Consulta Veterinaria",
    descricao: "Servico referencia para demonstracao",
    preco: 150,
  },
  {
    id: 3,
    nome: "Day Spa Pet",
    descricao: "Servico referencia para demonstracao",
    preco: 200,
  },
];

const Booking = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialFormState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const token = authStorage.getToken();

  const servicosQuery = useQuery({
    queryKey: ["servicos"],
    queryFn: api.listarServicos,
  });

  const agendamentosQuery = useQuery({
    queryKey: ["agendamentos"],
    queryFn: () => api.listarAgendamentos(token ?? ""),
    enabled: Boolean(token),
  });

  const createAgendamento = useMutation({
    mutationFn: (payload: AgendamentoPayload) => {
      if (!token) {
        return Promise.reject(new Error("Token ausente"));
      }
      return api.criarAgendamento(payload, token);
    },
    onSuccess: () => {
      toast({
        title: "Agendamento confirmado!",
        description: "Seu agendamento foi registrado com sucesso.",
      });
      setFormData(initialFormState);
      agendamentosQuery.refetch();
    },
    onError: (error: unknown) => {
      const message =
        error instanceof ApiError || error instanceof Error
          ? error.message
          : "Erro ao criar agendamento.";
      toast({
        title: "Erro no agendamento",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast({
        title: "Autenticacao necessaria",
        description: "Faca login para realizar agendamentos.",
        variant: "destructive",
      });
      return;
    }

    if (
      !formData.nome ||
      !formData.telefone ||
      !formData.data ||
      !formData.hora ||
      !formData.idServico
    ) {
      toast({
        title: "Erro no agendamento",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const payload: AgendamentoPayload = {
      nome: formData.nome,
      telefone: formData.telefone,
      data: formData.data,
      hora: formData.hora,
      idServico: Number(formData.idServico),
    };

    await createAgendamento.mutateAsync(payload);
  };

  const agendamentos = agendamentosQuery.data ?? [];
  const servicos = servicosQuery.data ?? [];
  const selectableServicos = servicos.length > 0 ? servicos : fallbackServicos;

  const selectedServiceName = useMemo(() => {
    const selected = selectableServicos.find((service) => String(service.id) === formData.idServico);
    return selected?.nome ?? "";
  }, [formData.idServico, selectableServicos]);

  const dialogSubtitle = !token
    ? "Faca login para visualizar seus agendamentos."
    : agendamentosQuery.isLoading
      ? "Carregando agendamentos..."
      : agendamentos.length === 0
        ? "Nenhum agendamento encontrado."
        : undefined;

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
              {dialogSubtitle ? (
                <p className="text-center text-muted-foreground py-8">{dialogSubtitle}</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Servico</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Horario</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agendamentos.map((agendamento: Agendamento) => (
                      <TableRow key={agendamento.id}>
                        <TableCell>{agendamento.nome}</TableCell>
                        <TableCell>{agendamento.telefone}</TableCell>
                        <TableCell>{agendamento.servico?.nome ?? "-"}</TableCell>
                        <TableCell>
                          {new Date(agendamento.data).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>{agendamento.hora}</TableCell>
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
            Escolha o melhor dia e horario para cuidar do seu pet
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
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={(e) =>
                    setFormData({ ...formData, telefone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Servico Desejado</Label>
              <Select
                value={formData.idServico}
                onValueChange={(value) =>
                  setFormData({ ...formData, idServico: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o servico" />
                </SelectTrigger>
                <SelectContent>
                  {selectableServicos.map((servico: Servico) => (
                    <SelectItem key={servico.id} value={String(servico.id)}>
                      {servico.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!servicosQuery.isLoading && servicos.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Nenhum servico cadastrado. Exibindo opcoes de referencia.
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Data do Agendamento</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.data}
                  onChange={(e) =>
                    setFormData({ ...formData, data: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horario</Label>
                <Select
                  value={formData.hora}
                  onValueChange={(value) =>
                    setFormData({ ...formData, hora: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horario" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "08:00",
                      "09:00",
                      "10:00",
                      "11:00",
                      "14:00",
                      "15:00",
                      "16:00",
                      "17:00",
                    ].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedServiceName && (
              <p className="text-sm text-muted-foreground">
                Servico selecionado: {selectedServiceName}
              </p>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={createAgendamento.isPending}>
              {createAgendamento.isPending ? "Enviando..." : "Confirmar Agendamento"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Booking;
