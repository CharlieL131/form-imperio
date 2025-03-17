const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const Joi = require("joi");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

const db = new sqlite3.Database("database.db");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend/out")));

const estados = [
    { nome: "Rondônia", sigla: "RO", id: 11 },
    { nome: "Acre", sigla: "AC", id: 12 },
    { nome: "Amazonas", sigla: "AM", id: 13 },
    { nome: "Roraima", sigla: "RR", id: 14 },
    { nome: "Pará", sigla: "PA", id: 15 },
    { nome: "Amapá", sigla: "AP", id: 16 },
    { nome: "Tocantins", sigla: "TO", id: 17 },
    { nome: "Maranhão", sigla: "MA", id: 21 },
    { nome: "Piauí", sigla: "PI", id: 22 },
    { nome: "Ceará", sigla: "CE", id: 23 },
    { nome: "Rio Grande do Norte", sigla: "RN", id: 24 },
    { nome: "Paraíba", sigla: "PB", id: 25 },
    { nome: "Pernambuco", sigla: "PE", id: 26 },
    { nome: "Alagoas", sigla: "AL", id: 27 },
    { nome: "Sergipe", sigla: "SE", id: 28 },
    { nome: "Bahia", sigla: "BA", id: 29 },
    { nome: "Minas Gerais", sigla: "MG", id: 31 },
    { nome: "Espírito Santo", sigla: "ES", id: 32 },
    { nome: "Rio de Janeiro", sigla: "RJ", id: 33 },
    { nome: "São Paulo", sigla: "SP", id: 35 },
    { nome: "Paraná", sigla: "PR", id: 41 },
    { nome: "Santa Catarina", sigla: "SC", id: 42 },
    { nome: "Rio Grande do Sul", sigla: "RS", id: 43 },
    { nome: "Mato Grosso do Sul", sigla: "MS", id: 50 },
    { nome: "Mato Grosso", sigla: "MT", id: 51 },
    { nome: "Goiás", sigla: "GO", id: 52 },
    { nome: "Distrito Federal", sigla: "DF", id: 53 },
];

const tabelaVazia = (tabela) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT COUNT(*) AS count FROM ${tabela}`, (err, row) => {
            if (err) reject(err);
            else resolve(row.count === 0);
        });
    });
};

const inserirEstados = () => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Estados (id, sigla, nome) VALUES (?, ?, ?)";
        const promises = estados.map((estado) => {
            return new Promise((resolve, reject) => {
                db.run(query, [estado.id, estado.sigla, estado.nome], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        });

        Promise.all(promises)
            .then(() => resolve())
            .catch((err) => reject(err));
    });
};

const inserirCidades = (estadoId) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            .then((response) => {
                const cidades = response.data;
                const query = "INSERT INTO Cidades (id, estado_id, nome) VALUES (?, ?, ?)";
                const promises = cidades.map((cidade) => {
                    return new Promise((resolve, reject) => {
                        db.run(query, [cidade.id, estadoId, cidade.nome], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                });

                Promise.all(promises)
                    .then(() => resolve())
                    .catch((err) => reject(err));
            })
            .catch((err) => reject(err));
    });
};

const inicializarBancoDeDados = async () => {
    try {
        const estadosVazios = await tabelaVazia("Estados");
        const cidadesVazias = await tabelaVazia("Cidades");

        if (estadosVazios) {
            console.log("Inserindo estados...");
            await inserirEstados();
            console.log("Estados inseridos com sucesso!");
        }

        if (cidadesVazias) {
            console.log("Inserindo cidades...");
            for (const estado of estados) {
                await inserirCidades(estado.id);
                console.log(`Cidades do estado ${estado.nome} inseridas com sucesso!`);
            }
            console.log("Cidades inseridas com sucesso!");
        }
    } catch (err) {
        console.error("Erro ao inicializar o banco de dados:", err);
    }
};

inicializarBancoDeDados();

const schema = Joi.object({
    nome: Joi.string().required(),
    data_nascimento: Joi.date().required(),
    cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required(),
    telefone: Joi.string().pattern(/^\(\d{2}\) \d{5}-\d{4}$/).required(),
    email: Joi.string().email().required(),
    logradouro: Joi.string().required(),
    bairro: Joi.string().required(),
    numero: Joi.string().required(),
    cidade: Joi.string().required(),
    estado: Joi.string().required(),
    cep: Joi.string().pattern(/^\d{5}-\d{3}$/).required(),
    numero_nota: Joi.string().required(),
    cnpj_empresa: Joi.string().pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/).required(),
    data_compra: Joi.date().required(),
    resposta: Joi.string().required(),
});

app.post("/api/form", (req, res) => {
    console.log(req.body);
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const erros = error.details.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
        }, {});
        return res.status(400).json({ errors: erros });
    }

    const formulario = req.body;

    db.serialize(() => {
        db.run("BEGIN TRANSACTION");

        db.get(
            "SELECT id FROM Clientes WHERE cpf = ?",
            [formulario.cpf],
            (err, cliente) => {
                if (err) {
                    db.run("ROLLBACK");
                    return res.status(500).json({ error: "Erro ao buscar cliente." });
                }

                let clienteId;

                const finalizarTransacao = () => {
                    db.run(
                        "INSERT INTO NotasFiscais (cliente_id, numero_nota, cnpj_empresa, data_compra) VALUES (?, ?, ?, ?)",
                        [
                            clienteId,
                            formulario.numero_nota,
                            formulario.cnpj_empresa,
                            formulario.data_compra,
                        ],
                        (err) => {
                            if (err) {
                                db.run("ROLLBACK");
                                return res.status(400).json({ error: "Erro ao inserir nota fiscal." });
                            }

                            db.run(
                                "INSERT INTO Respostas (cliente_id, resposta) VALUES (?, ?)",
                                [clienteId, formulario.resposta],
                                (err) => {
                                    if (err) {
                                        db.run("ROLLBACK");
                                        return res.status(400).json({ error: "Erro ao inserir resposta." });
                                    }

                                    db.run("COMMIT", () => {
                                        res.json({ message: "Formulário enviado com sucesso!" });
                                    });
                                }
                            );
                        }
                    );
                };

                if (cliente) {
                    clienteId = cliente.id;
                    finalizarTransacao();
                } else {
                    db.run(
                        "INSERT INTO Clientes (nome, data_nascimento, cpf, telefone, email) VALUES (?, ?, ?, ?, ?)",
                        [
                            formulario.nome,
                            formulario.data_nascimento,
                            formulario.cpf,
                            formulario.telefone,
                            formulario.email,
                        ],
                        function (err) {
                            if (err) {
                                db.run("ROLLBACK");
                                return res.status(400).json({ error: "Erro ao inserir cliente." });
                            }
                            clienteId = this.lastID;

                            db.run(
                                "INSERT INTO Enderecos (cliente_id, logradouro, bairro, numero, cidade_id, cep) VALUES (?, ?, ?, ?, ?, ?)",
                                [
                                    clienteId,
                                    formulario.logradouro,
                                    formulario.bairro,
                                    formulario.numero,
                                    formulario.cidade,
                                    formulario.cep,
                                ],
                                (err) => {
                                    if (err) {
                                        db.run("ROLLBACK");
                                        return res.status(400).json({ error: "Erro ao inserir endereço." });
                                    }

                                    finalizarTransacao();
                                }
                            );
                        }
                    );
                }
            }
        );
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/out/index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
});