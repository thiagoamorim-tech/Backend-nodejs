const express = require("express");
const router = express.Router();

let jogos = [
  { id: 1, titulo: "God of war 4", plataforma: "PS4", genero: "hack and slash", anoLancamento: 2018 },
  { id: 2, titulo: "Tomb Raider", plataforma: "PC", genero: "Aventura", anoLancamento: 2013 }
];

router.get('/', (req, res) => {
  res.status(200).json(jogos);
});

router.get('/:id', (req, res) => {
  const idProcurado = Number(req.params.id);
  if (Number.isNaN(idProcurado)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  const procurarJogo = jogos.find(p => p.id === idProcurado);
  if (!procurarJogo) {
    return res.status(404).json({ mensagem: "Jogo não encontrado" });
  }

  res.status(200).json(procurarJogo);
});

router.post('/', (req, res) => {
  const { titulo, plataforma, genero, anoLancamento } = req.body;

  if (!titulo || !plataforma || !genero || !anoLancamento) {
    return res.status(400).json({
      mensagem: "Os campos 'titulo', 'plataforma', 'genero' e 'anoLancamento' são obrigatórios"
    });
  }

  const novoId = jogos.length > 0 ? Math.max(...jogos.map(j => j.id)) + 1 : 1;
  const novoJogo = { id: novoId, titulo, plataforma, genero, anoLancamento };

  jogos.push(novoJogo);

  res.status(201).json({
    mensagem: "Jogo adicionado com sucesso!",
    jogo: novoJogo
  });
});

router.put('/:id', (req, res) => {
  const idProcurado = Number(req.params.id);
  if (Number.isNaN(idProcurado)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  const procurarJogo = jogos.find(p => p.id === idProcurado);
  if (!procurarJogo) {
    return res.status(404).json({ mensagem: "Jogo não encontrado" });
  }

  const { titulo, plataforma, genero, anoLancamento } = req.body;

  if (titulo !== undefined) procurarJogo.titulo = titulo;
  if (plataforma !== undefined) procurarJogo.plataforma = plataforma;
  if (genero !== undefined) procurarJogo.genero = genero;
  if (anoLancamento !== undefined) procurarJogo.anoLancamento = anoLancamento;

  res.status(200).json({
    mensagem: "Jogo atualizado com sucesso",
    jogo: procurarJogo
  });
});

router.delete('/:id', (req, res) => {
  const idProcurado = Number(req.params.id);
  if (Number.isNaN(idProcurado)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  const index = jogos.findIndex(jogo => jogo.id === idProcurado);
  if (index === -1) {
    return res.status(404).json({ mensagem: "Jogo não encontrado" });
  }

  const [removido] = jogos.splice(index, 1);

  res.status(200).json({
    mensagem: "Jogo removido com sucesso",
    removido
  });
});

module.exports = router;
