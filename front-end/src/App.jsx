import './App.css'
import PesquisaFilmes from "./Components/PesquisarFilmes.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center pt-6">🎬 Catálogo de Filmes</h1>
      <PesquisaFilmes />
    </div>
  );
}

export default App
