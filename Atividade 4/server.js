const express = require("express");
const cors = require("cors");
const jogosRoutes = require("./routes/jogos");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


const requestLogger = (req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
};

app.use(requestLogger);


app.use("/jogos", jogosRoutes);


app.use((req, res) => {
  res.status(404).json({ mensagem: "Rota não encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
