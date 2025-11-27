const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:5000").replace(/\/$/, "");

type RequestOptions = RequestInit & {
  token?: string | null;
  skipJson?: boolean;
};

export class ApiError extends Error {
  status: number;
  payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

async function request<TResponse>(
  path: string,
  { token, skipJson, ...options }: RequestOptions = {},
): Promise<TResponse> {
  const headers = new Headers(options.headers);

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorPayload: unknown;
    try {
      errorPayload = await response.json();
    } catch {
      errorPayload = undefined;
    }
    const message =
      (errorPayload as { message?: string })?.message ??
      "Erro ao se comunicar com o servidor.";
    throw new ApiError(message, response.status, errorPayload);
  }

  if (skipJson || response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

export interface CadastroPayload {
  nome: string;
  email: string;
  senha: string;
}

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
}

export interface Agendamento {
  id: string;
  nome: string;
  telefone: string;
  data: string;
  hora: string;
  servico?: Servico;
}

export interface AgendamentoPayload {
  nome: string;
  telefone: string;
  data: string;
  hora: string;
  idServico: number;
}

export const api = {
  criarCadastro: (payload: CadastroPayload) =>
    request("/cadastro", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload: LoginPayload) =>
    request<LoginResponse>("/login", { method: "POST", body: JSON.stringify(payload) }),
  listarServicos: () => request<Servico[]>("/servico", { method: "GET" }),
  criarAgendamento: (payload: AgendamentoPayload, token: string) =>
    request("/agendamentos", {
      method: "POST",
      body: JSON.stringify(payload),
      token,
    }),
  listarAgendamentos: (token: string) =>
    request<Agendamento[]>("/agendamentos", { method: "GET", token }),
};
