import { useState } from "react";
import axios from "axios";

function AdicionarFilme() {
  const [filme, setFilme] = useState({
    nome: "",
    descricao: "",
    avaliacao: "",
    ondeAssistir: "",
    capaUrl: "",
    categoria: "",
    usuarioId: ""
  });

  const handleChange = (e) => {
    setFilme({ ...filme, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/filmes", {
        ...filme,
        avaliacao: parseFloat(filme.avaliacao),
        usuarioId: parseInt(filme.usuarioId)
      });

      alert("Filme adicionado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar filme.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Adicionar Filme</h2>
      <input name="nome" placeholder="Título" onChange={handleChange} required />
      <textarea name="descricao" placeholder="Descrição" onChange={handleChange} required />
      <input name="avaliacao" type="number" step="0.1" placeholder="Avaliação (ex: 4.5)" onChange={handleChange} />
      <input name="ondeAssistir" placeholder="Onde Assistir (ex: Netflix)" onChange={handleChange} /> 
      <input name="capaUrl" placeholder="URL da Capa (Cloudinary)" onChange={handleChange} required />
      <input name="categoria" placeholder="Categoria (ex: Ação)" onChange={handleChange} />
      <input name="usuarioId" placeholder="ID do Usuário" onChange={handleChange} required />
      <button type="submit">Adicionar Filme</button>
    </form>
  );
}

export default AdicionarFilme;