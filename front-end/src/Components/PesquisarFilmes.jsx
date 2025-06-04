// src/components/PesquisaFilmes.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function PesquisaFilmes() {
  const [busca, setBusca] = useState("");
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const buscarFilmes = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/filmes/pesquisar?nome=${busca}`);
        setFilmes(res.data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    if (busca.trim() !== "") {
      buscarFilmes();
    } else {
      setFilmes([]); // limpa quando campo está vazio
    }
  }, [busca]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Buscar filmes..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <div className="grid gap-4">
        {filmes.map((filme) => (
          <div key={filme.id} className="flex gap-4 border rounded p-4 shadow">
            <img src={filme.capaUrl} alt={filme.titulo} className="w-32 h-48 object-cover rounded" />
            <div>
              <h2 className="text-xl font-bold">{filme.titulo}</h2>
              <p className="text-sm text-gray-600 mb-2">{filme.descricao}</p>
              <span className="text-yellow-600 font-semibold">⭐ {filme.avaliacao}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
