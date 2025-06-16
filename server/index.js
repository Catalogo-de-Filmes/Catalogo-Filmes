const app = require('./src/app');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('❌ Erro ao iniciar o servidor:', err.message);
});

