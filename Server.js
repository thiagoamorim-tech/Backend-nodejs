const { resolveSoa } = require('dns');
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
 console.log(req.url);
 //res.end("Servidor node funcionando");

 res.setHeader('Content-Type', 'text/plain; charset=utf-8');

 if (req.url === '/') {
     res.statusCode = 200;
     return res.end("Você está na página inicial");

 }

 else if (req.url === '/sobre') {
     res.statusCode = 200;
      return res.end("Você está na página sobre");

 }
 else if (req.url === '/alunos') {
     res.statusCode = 200;
      return res.end ("lista de alunos");
 }

 else if (req.url === '/contato') {
     res.statusCode = 200;
    return  res.end ("Entre em contato conosco");
 }

 else {
    res.statusCode = 404;
    return res.end("Rota não econtrada");
 }

});

server.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
}

)
