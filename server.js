//configurando o servidor
const express = require("express");
const server = express();

//configurar o servidor para apresentar arquivos estaticos
server.use(express.static("public"));

// habilitar body do formulario
server.use(express.urlencoded({ extended: true }));

//configurando a template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
  express: server,
  noCache: true // não fazer cache
});

// lista de doadores: Vetor ou Array
const donors = [
  { name: "Davi Bernardo", blood: "AB+" },

  { name: "Cleiton Souza", blood: "O+" },

  { name: "Dayane Bartolomeu", blood: "B+" },

  { name: "Fausto Silva", blood: "A-" }
];

//configurar a apresentação da pagina
server.get("/", function(req, res) {
  return res.render("index.html", { donors });
});

server.post("/", function(req, res) {
  //pegar dados do formulario.
  const name = req.body.name;
  const email = req.body.email;
  const blood = req.body.blood;

  // coloco valores dentro do array
  donors.push({
    name: name,
    blood: blood
  });

  return res.redirect("/");
});

//ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function() {
  console.log("iniciei o servidor");
});
