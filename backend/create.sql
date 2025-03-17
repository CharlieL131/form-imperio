CREATE TABLE IF NOT EXISTS Estados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sigla TEXT NOT NULL UNIQUE,
    nome TEXT NOT NULL
);

-- Tabela de Cidades
CREATE TABLE IF NOT EXISTS Cidades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    estado_id INTEGER NOT NULL,
    nome TEXT NOT NULL,
    FOREIGN KEY (estado_id) REFERENCES Estados(id) ON DELETE CASCADE
);

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS Clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    data_nascimento DATE NOT NULL, -- Tipo DATE para datas
    cpf TEXT NOT NULL UNIQUE CHECK (cpf LIKE '___.___.___-__'), -- Formato CPF
    telefone TEXT NOT NULL CHECK (telefone LIKE '(__) _____-____'), -- Formato telefone
    email TEXT NOT NULL CHECK (email LIKE '%_@__%.__%') -- Formato e-mail
);

-- Tabela de Enderecos
CREATE TABLE IF NOT EXISTS Enderecos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    logradouro TEXT NOT NULL,
    bairro TEXT NOT NULL,
    numero TEXT NOT NULL,
    cidade_id INTEGER NOT NULL, -- Referência à tabela Cidades
    cep TEXT NOT NULL CHECK (cep LIKE '_____-___'), -- Formato CEP
    FOREIGN KEY (cliente_id) REFERENCES Clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (cidade_id) REFERENCES Cidades(id) ON DELETE CASCADE
);

-- Tabela de NotasFiscais
CREATE TABLE IF NOT EXISTS NotasFiscais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    numero_nota TEXT NOT NULL UNIQUE, -- Número da nota fiscal único
    cnpj_empresa TEXT NOT NULL CHECK (cnpj_empresa LIKE '__.___.___/____-__'), -- Formato CNPJ
    data_compra DATE NOT NULL, -- Tipo DATE para datas
    FOREIGN KEY (cliente_id) REFERENCES Clientes(id) ON DELETE CASCADE
);

-- Tabela de Respostas
CREATE TABLE IF NOT EXISTS Respostas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    resposta TEXT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES Clientes(id) ON DELETE CASCADE
);

-- Índices para melhorar performance
CREATE INDEX idx_cpf ON Clientes (cpf);
CREATE INDEX idx_numero_nota ON NotasFiscais (numero_nota);
CREATE INDEX idx_cliente_id ON Enderecos (cliente_id);
CREATE INDEX idx_cidade_id ON Enderecos (cidade_id);