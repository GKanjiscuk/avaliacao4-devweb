const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fatec',
  database: 'devweb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao MySQL!');
});

// ====== PERFIL ======
// A rota de perfil continua a mesma, pois é a entidade principal.
app.post('/perfil', (req, res) => {
  const { nome } = req.body;
  const sql = 'INSERT INTO perfil (nome) VALUES (?)';
  db.query(sql, [nome], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, nome });
  });
});

app.get('/perfil', (req, res) => {
  db.query('SELECT * FROM perfil', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.get('/perfil/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM perfil WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results[0]);
  });
});

// ====== SOBRE MIM ======
app.post('/sobre', (req, res) => {
  const { texto, perfil_id } = req.body;
  const sql = 'INSERT INTO sobre_mim (texto, perfil_id) VALUES (?, ?)';
  db.query(sql, [texto, perfil_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, texto, perfil_id });
  });
});

// Rota GET: Retorna TODOS os registros "sobremim"
app.get('/sobre', (req, res) => {
  db.query('SELECT * FROM sobre_mim', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Rota PUT: Atualiza um "sobremim" por ID (apenas ID no WHERE)
app.put('/sobre/:id', (req, res) => {
  const { texto } = req.body;
  const sql = 'UPDATE sobre_mim SET texto = ? WHERE id = ?';
  db.query(sql, [texto, req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).send({ mensagem: 'Texto "Sobre Mim" não encontrado.' });
    }
    res.send({ id: req.params.id, texto });
  });
});

// Rota DELETE: Deleta um "sobremim" por ID (apenas ID no WHERE)
app.delete('/sobre/:id', (req, res) => {
  const sql = 'DELETE FROM sobre_mim WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).send({ mensagem: 'Texto "Sobre Mim" não encontrado.' });
    }
    res.send({ mensagem: 'Texto "Sobre Mim" excluído com sucesso' });
  });
});

// ====== HARD SKILLS ======
// POST: Adiciona nova Hard Skill com 'icone'
app.post('/hardskills', (req, res) => {
  const { nome, descricao, perfil_id, icone } = req.body;
  const sql = 'INSERT INTO hardskill (nome, descricao, perfil_id, icone) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, descricao, perfil_id, icone], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, nome, descricao, perfil_id, icone });
  });
});

// GET: Retorna TODAS as hard skills
app.get('/hardskills', (req, res) => {
  db.query('SELECT * FROM hardskill', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// PUT: Atualiza Hard Skill por ID, incluindo o campo 'icone'
app.put('/hardskills/:id', (req, res) => {
  const { nome, descricao, icone } = req.body;
  const sql = 'UPDATE hardskill SET nome = ?, descricao = ?, icone = ? WHERE id = ?';
  db.query(sql, [nome, descricao, icone, req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).send({ mensagem: 'Hard Skill não encontrada.' });
    }
    res.send({ id: req.params.id, nome, descricao, icone });
  });
});

// DELETE: Deleta por ID
app.delete('/hardskills/:id', (req, res) => {
  const sql = 'DELETE FROM hardskill WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).send({ mensagem: 'Hard Skill não encontrada.' });
    }
    res.send({ mensagem: 'Hard Skill excluída com sucesso' });
  });
});


// ====== SOFT SKILLS ======
app.post('/softskills', (req, res) => {
  const { nome, perfil_id } = req.body;
  const sql = 'INSERT INTO softskill (nome, perfil_id) VALUES (?, ?)';
  db.query(sql, [nome, perfil_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, nome, perfil_id });
  });
});

// GET: Retorna TODAS as soft skills (sem filtro)
app.get('/softskills', (req, res) => {
  db.query('SELECT * FROM softskill', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// PUT: Atualiza por ID (REMOVIDO perfil_id do WHERE)
app.put('/softskills/:id', (req, res) => {
  const { nome } = req.body;
  const sql = 'UPDATE softskill SET nome = ? WHERE id = ?';
  db.query(sql, [nome, req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).send({ mensagem: 'Soft Skill não encontrada.' });
    }
    res.send({ id: req.params.id, nome });
  });
});

// DELETE: Deleta por ID (REMOVIDO perfil_id do WHERE)
app.delete('/softskills/:id', (req, res) => {
  const sql = 'DELETE FROM softskill WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).send({ mensagem: 'Soft Skill não encontrada.' });
    }
    res.send({ mensagem: 'Soft Skill excluída com sucesso' });
  });
});

// ====== PROJETOS ======
app.post('/projetos', (req, res) => {
  const { link, imagem_url, perfil_id } = req.body;
  const sql = 'INSERT INTO projeto (link, imagem_url, perfil_id) VALUES (?, ?, ?)';
  db.query(sql, [link, imagem_url, perfil_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, link, imagem_url, perfil_id });
  });
});

// GET: Retorna TODOS os projetos (sem filtro)
app.get('/projetos', (req, res) => {
  db.query('SELECT * FROM projeto', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// PUT: Atualiza por ID (REMOVIDO perfil_id do WHERE)
app.put('/projetos/:id', (req, res) => {
  const { link, imagem_url } = req.body;
  const sql = 'UPDATE projeto SET link = ?, imagem_url = ? WHERE id = ?';
  db.query(sql, [link, imagem_url, req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).send({ mensagem: 'Projeto não encontrado.' });
    }
    res.send({ id: req.params.id, link, imagem_url });
  });
});

// DELETE: Deleta por ID (REMOVIDO perfil_id do WHERE)
app.delete('/projetos/:id', (req, res) => {
  const sql = 'DELETE FROM projeto WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).send({ mensagem: 'Projeto não encontrado.' });
    }
    res.send({ mensagem: 'Projeto excluído com sucesso' });
  });
});

// ====== CERTIFICACOES ======
app.post('/certificacoes', (req, res) => {
  const { nome, perfil_id } = req.body;
  const sql = 'INSERT INTO certificacao (nome, perfil_id) VALUES (?, ?)';
  db.query(sql, [nome, perfil_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, nome, perfil_id });
  });
});

// GET: Retorna TODAS as certificações (sem filtro)
app.get('/certificacoes', (req, res) => {
  db.query('SELECT * FROM certificacao', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// PUT: Atualiza por ID (REMOVIDO perfil_id do WHERE)
app.put('/certificacoes/:id', (req, res) => {
  const { nome } = req.body;
  const sql = 'UPDATE certificacao SET nome = ? WHERE id = ?';
  db.query(sql, [nome, req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).send({ mensagem: 'Certificação não encontrada.' });
    }
    res.send({ id: req.params.id, nome });
  });
});

// DELETE: Deleta por ID (REMOVIDO perfil_id do WHERE)
app.delete('/certificacoes/:id', (req, res) => {
  const sql = 'DELETE FROM certificacao WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).send({ mensagem: 'Certificação não encontrada.' });
    }
    res.send({ mensagem: 'Certificação excluída com sucesso' });
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});