import fastify from "fastify";
import cors from '@fastify/cors'
import fastifyJwt from "fastify-jwt";
import { env } from "./utils/enviroment";
import { login } from "./routes/auth/Login";
import { rotaCadastro } from "./routes/cadastroRoute";
import { rotaServico } from "./routes/servicoRoute";
import { rotaAgendamento } from "./routes/agendamentoRoute";

const app = fastify({logger: true});

app.listen({port: 5000}, (err, address) => {
    if(err) {
        app.log.error(err);
        process.exit(1);
    }   console.log("SERVER RUNNING ON " + address);
});

app.register(fastifyJwt, {
    secret: env.SECRET
});

app.register(cors, {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', "PATCH"],
  });

app.register(rotaCadastro);
app.register(login);
app.register(rotaServico);
app.register(rotaAgendamento);
