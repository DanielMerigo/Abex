const express = require("express");
const router = express.Router();
const db = require("../db");

// ---------------- SELECT ------------------
router.get("/", async function(req, res, next) {                //diz q vai ser uma "get" e logo depois inicia uma função 
 try {
 const results = await db.query("SELECT * FROM chaves");      //Inicia a query para digitar comandos SQL
 return res.json(results.rows);                                 //Mostra o resultado
 } catch (err) {                                                //caso der erro
 return next(err);      
 }
});

// -------------- INSERT --------------------------
router.post("/", async function(req, res, next) {
 try {
 const result = await db.query(
 "INSERT INTO chaves (chave, id_usuario) VALUES ($1,$2) RETURNING *",
 [req.body.chave, req.body.id_usuario]
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
 "UPDATE chaves SET chave=$1 WHERE id=$2 RETURNING *",
 [req.body.chave, req.params.id]
 );
 return res.json(result.rows[0]);
 } catch (err) {
 return next(err);
 }
});

// ----------- DELETE -----------------------
router.delete("/:id", async function(req, res, next) {
 try {
 const result = await db.query("DELETE FROM chaves WHERE id=$1", [
 req.params.id
 ]);
 return res.json({ message: "Deleted" });
 } catch (err) {
 return next(err);
 }
});

module.exports = router;
