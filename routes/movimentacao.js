
const express = require("express");
const router = express.Router();
const db = require("../db");

// ---------------- SELECT ------------------
router.get("/", async function(req, res, next) {                
 try {
 const results = await db.query("SELECT * FROM movimentacao");      
 return res.json(results.rows);                                 
 } catch (err) {                                                
 return next(err);      
 }
});

// -------------- INSERT --------------------------
router.post("/", async function(req, res, next) {
 try {
 const result = await db.query(
 "INSERT INTO movimentacao (id_usuario, id_saldo, id_planejamento, tipo, descricao, data, valor) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
 [req.body.id_usuario, req.body.id_saldo, req.body.id_planejamento, req.body.tipo, req.body.descricao, req.body.data, req.body.valor]
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
"UPDATE movimentacao SET tipo=$1, descricao=$2, data=$3, valor=$4 WHERE id=$5 RETURNING *",
[ req.body.tipo, req.body.descricao, req.body.data, req.body.valor, req.params.id]
);
return res.json(result.rows[0]);
} catch (err) {
return next(err);
}
});

// ----------- DELETE -----------------------
router.delete("/:id", async function(req, res, next) {
 try {
 const result = await db.query("DELETE FROM movimentacao WHERE id=$1", [
 req.params.id
 ]);
 return res.json({ message: "Deleted" });
 } catch (err) {
 return next(err);
 }
});

module.exports = router;
