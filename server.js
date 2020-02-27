//configurando o servidor
const express = require("express");
const server = express();

//configurar o servidor para apresentar arquivos estaticos
server.use(express.static("public"));

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

//ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function() {
  console.log("iniciei o servidor");
});
