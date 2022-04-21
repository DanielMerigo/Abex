const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const usuarioRoutes = require("./routes/usuario.js");
const chavesRoutes = require("./routes/chaves.js");
const saldoRoutes = require("./routes/saldo.js");
const planRoutes = require("./routes/planejamento.js");
const moveRoutes = require("./routes/movimentacao");

// --------- URL PARA A TABELA USUARIO -----------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/usuario", usuarioRoutes);

// -------- URL PARA A TABELA CHAVES -----------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/chaves", chavesRoutes);

// ------ URL PARA A TABLA SALDO --------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/saldo", saldoRoutes);

// ------ URL PARA A TABLA PLANEJAMENTO --------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/planejamento", planRoutes);

// ------ URL PARA A TABLA MOVIMENTACAO --------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/movimentacao", moveRoutes);


app.use(function(req, res, next) {
 let err = new Error("Not Found");
 err.status = 404;
 next(err);
});

if (app.get("env") === "development") {
 app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 res.send({
 message: err.message,
 error: err
 });
 });
}

// -------- CONEXÃO DO EXPREESS PARA FAZER UM LOCALHOST ------------
app.listen(3000, function() {                       
 console.log("Server starting on port 3000!");      
});
