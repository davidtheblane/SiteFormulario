//configurando o servidor
const express = require("express");
const server = express();

//configurar o servidor para apresentar arquivos estaticos
server.use(express.static("public"));

// habilitar body do formulario
server.use(express.urlencoded({ extended: true }));

// Configurar a conexão com o banco de dados
const Pool = require("pg").Pool;
const db = new Pool({
  user: "postgres",
  password: "1987",
  host: "localhost",
  port: 5432,
  database: "doe"
});

//configurando a template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
  express: server,
  noCache: true // não fazer cache
});

//configurar a apresentação da pagina
server.get("/", function(req, res) {
  db.query("SELECT * FROM donors", function(err, result) {
    if (err) return res.send("Erro no banco de dados.");

    const donors = result.rows;
    return res.render("index.html", { donors });
  });
});

server.post("/", function(req, res) {
  //pegar dados do formulario.
  const name = req.body.name;
  const email = req.body.email;
  const blood = req.body.blood;

  //Não deixar valores vazios irem pro DB
  if (name == "" || email == "" || blood == "") {
    return res.send("Todos os campos são obrigatórios");
  }

  // coloco valores dentro do Banco de dados
  const query = `INSERT INTO donors ("name", "email", "blood")
  VALUES ($1, $2, $3)`;

  const values = [name, email, blood];

  db.query(query, values, function(err) {
    //fluxo de erro
    if (err) return res.send("erro no banco de dados.");

    //fluxo ideal
    return res.redirect("/");
  });
});

//ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function() {
  console.log("iniciei o servidor");
});
