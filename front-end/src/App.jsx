import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PesquisarFilmes from "./Components/PesquisarFilmes";
import AdicionarFilme from "./Components/AdicionarFilme";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-center pt-6">🎬 Catálogo de Filmes</h1>
        <PesquisarFilmes />
        <Routes>
          <Route path="/adicionar-filme" element={<AdicionarFilme />} />
          {/* outras rotas se existirem */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;