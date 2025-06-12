import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PesquisaFilmes from './Components/PesquisarFilmes.jsx';
import AdicionarFilme from './Components/AdicionarFilme.jsx'; // crie esse componente

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="p-6 text-center flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">🎬 Catálogo de Filmes</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-blue-600 hover:underline">Buscar</Link>
            <Link to="/adicionar" className="text-green-600 hover:underline">Adicionar Filme</Link>
          </nav>
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<PesquisaFilmes />} />
            <Route path="/adicionar" element={<AdicionarFilme />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

