const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

let alunos = [
  { id: 1, nome: "Ana", curso: "Computação" },
  { id: 2, nome: "Pedro", curso: "Sistema da Informação" }
];

app.get('/alunos', (req, res) => {
  res.status(200).json(alunos);
});


app.get('/alunos/:id', (req, res) => {
  const idProcurado = Number(req.params.id);

  if (Number.isNaN(idProcurado)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  const procurarAluno = alunos.find(p => p.id === idProcurado);

  if (!procurarAluno) {
    return res.status(404).json({ mensagem: "Aluno não encontrado" });
  }

  res.status(200).json(procurarAluno);
});


app.post('/alunos', (req, res) => {
  const { nome, curso } = req.body;

  if (!nome || !curso) {
    return res.status(400).json({
      mensagem: "Os campos 'nome' e 'curso' são obrigatórios"
    });
  }

  
  const novoId = alunos.length > 0
    ? Math.max(...alunos.map(a => a.id)) + 1
    : 1;

  const novoAluno = { id: novoId, nome, curso };

  alunos.push(novoAluno);

  res.status(201).json({
    mensagem: "Aluno adicionado com sucesso!",
    aluno: novoAluno
  });
});

app.put('/alunos/:id', (req, res) => {
  const idProcurado = Number(req.params.id);

  if (Number.isNaN(idProcurado)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  const procurarAluno = alunos.find(p => p.id === idProcurado);

  if (!procurarAluno) {
    return res.status(404).json({ mensagem: "Aluno não encontrado" });
  }

  const { nome, curso } = req.body;

  if (nome !== undefined)  procurarAluno.nome  = nome;
  if (curso !== undefined) procurarAluno.curso = curso;

  res.status(200).json({
    mensagem: "Aluno atualizado com sucesso",
    aluno: procurarAluno
  });
});


app.delete('/alunos/:id', (req, res) => {
  const idProcurado = Number(req.params.id);

  if (Number.isNaN(idProcurado)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  const index = alunos.findIndex(aluno => aluno.id === idProcurado);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Aluno não encontrado" });
  }

  const [removido] = alunos.splice(index, 1);

  res.status(200).json({
    mensagem: "Aluno removido com sucesso",
    removido
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
