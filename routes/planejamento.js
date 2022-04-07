
const express = require("express");
const router = express.Router();
const db = require("../db");

// ---------------- SELECT ------------------
router.get("/", async function(req, res, next) {                //diz q vai ser uma "get" e logo depois inicia uma função 
 try {
 const results = await db.query("SELECT * FROM planejamento");      //Inicia a query para digitar comandos SQL
 return res.json(results.rows);                                 //Mostra o resultado
 } catch (err) {                                                //caso der erro
 return next(err);      
 }
});

// -------------- INSERT --------------------------
router.post("/", async function(req, res, next) {
 try {
 const result = await db.query(
 "INSERT INTO planejamento (ativo, tipo, descricao, data, valor, id_usuario) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
 [req.body.ativo, req.body.tipo, req.body.descricao, req.body.data, req.body.valor, req.body.id_usuario]
 );
 return res.json(result.rows[0]);
 } catch (err) {
 return next(err);
 }
});

// ------------- UPDATE ----------------------
router.patch("/:id", async function(req, res, next) {
try {
const result = await db.query(
"UPDATE planejamento SET ativo=$1, tipo=$2, descricao=$3, data=$4, valor=$5 WHERE id=$6 RETURNING *",
[req.body.ativo, req.body.tipo, req.body.descricao, req.body.data, req.body.valor, req.params.id]
);
return res.json(result.rows[0]);
} catch (err) {
return next(err);
}
});

// ----------- DELETE -----------------------
router.delete("/:id", async function(req, res, next) {
 try {
 const result = await db.query("DELETE FROM planejamento WHERE id=$1", [
 req.params.id
 ]);
 return res.json({ message: "Deleted" });
 } catch (err) {
 return next(err);
 }
});

module.exports = router;
