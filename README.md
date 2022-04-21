# crud_node

1. Install **Insomnia**;
2. Install all dependences **npm install express morgan body-parser pg**;
3. In insomnia write in link *localhost:port*(is defined in apps.js)use */* if use JSON;
4. Use **npm start** for run the project with express in localhost;


For creating a *database Abex* use thus SQL command

CREATE TABLE usuario (
	id SERIAL PRIMARY KEY NOT NULL,
	ativo BOOLEAN NOT NULL,
	nome VARCHAR(25) NOT NULL,
	sobrenome VARCHAR(25) NOT NULL,
	email VARCHAR(40) NOT NULL
)

CREATE TABLE chaves (
	id SERIAL PRIMARY KEY NOT NULL,
	chave VARCHAR(50) NOT NULL,
	id_usuario INTEGER NOT NULL,
	FOREIGN KEY (id_usuario) REFERENCES usuario(id)
)

CREATE TABLE saldo (
	id SERIAL PRIMARY KEY NOT NULL,
	saldos NUMERIC(10,2) NOT NULL,
	id_usuario INTEGER NOT NULL,
	FOREIGN KEY (id_usuario) REFERENCES usuario(id)
)

CREATE TABLE planejamento (
	id SERIAL PRIMARY KEY NOT NULL,
	id_usuario INTEGER NOT NULL,
	ativo BOOLEAN NOT NULL,
	tipo VARCHAR(30) NOT NULL,
	descricao VARCHAR(100) NOT NULL,
	data DATE NOT NULL,
	valor NUMERIC(10,2) NOT NULL,
	FOREIGN KEY (id_usuario) REFERENCES usuario(id)
)

CREATE TABLE movimentacao (
	id SERIAL PRIMARY KEY NOT NULL,
	id_usuario INTEGER NOT NULL,
	id_saldo INTEGER NOT NULL,
	id_planejamento INTEGER NOT NULL,
	tipo VARCHAR(30) NOT NULL,
	descricao VARCHAR(100) NOT NULL,
	data DATE NOT NULL,
	valor NUMERIC(10,2) NOT NULL,
	FOREIGN KEY (id_usuario) REFERENCES usuario(id),
	FOREIGN KEY (id_saldo) REFERENCES saldo(id),
	FOREIGN KEY (id_planejamento) REFERENCES planejamento(id)
)