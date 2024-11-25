const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3001;

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, 
  };
  
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));

const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const db = new sqlite3.Database("cadastro.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco SQLite.");
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS usuarios (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     nome TEXT NOT NULL,
     telefone TEXT,
     email TEXT NOT NULL,
     website TEXT,
     experiencia TEXT NOT NULL
   )`
);

app.get("/usuarios", (req, res) => {
    const query = "SELECT * FROM usuarios";
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error("Erro ao buscar registros:", err.message);
        res.status(500).send("Erro no servidor.");
      } else {
        res.status(200).json(rows);
      }
    });
  });

  app.post("/cadastro", (req, res) => {
    const { nome, email, telefone, website, experiencia } = req.body;
  
    const query =
      "INSERT INTO usuarios (nome, email, telefone, website, experiencia) VALUES (?, ?, ?, ?, ?)";
    
    if (!nome || !email || !experiencia) {
      return res.status(400).send("Campos obrigatórios não preenchidos.");
    }
  
    db.run(query, [nome, email, telefone, website, experiencia], function (err) {
      if (err) {
        console.error("Erro ao inserir usuário:", err.message);
        res.status(500).send("Erro ao inserir usuário.");
      } else {
        res.status(201).send({ id: this.lastID });
      }
    });
  });

  app.get("/usuarios/:id", (req, res) => {
    const { id } = req.params;
  
    const query = "SELECT * FROM usuarios WHERE id = ?";
    db.get(query, [id], (err, row) => {
      if (err) {
        console.error("Erro ao buscar usuário:", err.message);
        res.status(500).send("Erro ao buscar usuário.");
      } else if (!row) {
        res.status(404).send("Usuário não encontrado.");
      } else {
        res.status(200).json(row);
      }
    });
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
