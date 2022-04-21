const express = require("express");
const router = express.Router();
const db = require("../db");

// ---------------- SELECT ------------------
router.get("/", async function(req, res, next) {                //diz q vai ser uma "get" e logo depois inicia uma função 
 try {
 const results = await db.query("SELECT * FROM usuario");      //Inicia a query para digitar comandos SQL
 return res.json(results.rows);                                 //Mostra o resultado
 } catch (err) {                                                //caso der erro
 return next(err);      
 }
});

// -------------- INSERT --------------------------
router.post("/", async function(req, res, next) {
 try {
 const result = await db.query(
 "INSERT INTO usuario (ativo, nome, sobrenome, email) VALUES ($1,$2,$3,$4) RETURNING *",
 [req.body.ativo, req.body.nome, req.body.sobrenome, req.body.email ]
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
 "UPDATE usuario SET ativo=$1 nome=$2, sobrenome=$3, email=$4 WHERE id=$5 RETURNING *",
 [req.body.ativo, req.body.nome, req.body.sobrenome, req.body.email, req.params.id]
 );
 return res.json(result.rows[0]);
 } catch (err) {
 return next(err);
 }
});

// ----------- DELETE -----------------------
router.delete("/:id", async function(req, res, next) {
 try {
 const result = await db.query("DELETE FROM usuario WHERE id=$1", [
 req.params.id
 ]);
 return res.json({ message: "Deleted" });
 } catch (err) {
 return next(err);
 }
});

module.exports = router;
