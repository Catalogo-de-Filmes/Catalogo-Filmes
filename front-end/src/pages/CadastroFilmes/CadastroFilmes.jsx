import React, { useState } from 'react';
import './CadastroFilmes.css';

export default function CadastroFilmes() {
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nota, setNota] = useState('');
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [enviado, setEnviado] = useState(false);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !genero || !imagem || !descricao || nota === '') {
      alert('Preencha todos os campos!');
      return;
    }

    const notaValida = parseFloat(nota);
    if (isNaN(notaValida) || notaValida < 0 || notaValida > 10) {
      alert('A nota deve ser um número entre 0 e 10.');
      return;
    }

    const novoFilme = {
      titulo,
      genero,
      descricao,
      nota: notaValida,
      imagem: preview,
    };

    const filmesSalvos = JSON.parse(localStorage.getItem('filmes')) || [];
    filmesSalvos.push(novoFilme);
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos));

    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);

    setTitulo('');
    setGenero('');
    setDescricao('');
    setNota('');
    setImagem(null);
    setPreview(null);
  };

  return (
    <div className="cadastro-container">
      <h1>🎬 Cadastrar Filme</h1>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título do filme</label>
        <input
          id="titulo"
          type="text"
          placeholder="Ex: O Senhor dos Anéis"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label htmlFor="genero">Gênero</label>
        <input
          id="genero"
          type="text"
          placeholder="Ex: Aventura, Ação"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />

        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          placeholder="Breve sinopse ou descrição do filme"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <label htmlFor="nota">Nota (de 0 a 10)</label>
        <input
          id="nota"
          type="number"
          placeholder="Digite a nota do filme"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          min="0"
          max="10"
          step="0.1"
        />

        <label htmlFor="imagem">Capa do filme (imagem)</label>
        <input
          id="imagem"
          type="file"
          accept="image/*"
          onChange={handleImagemChange}
        />

        {preview && (
          <div className="preview">
            <img src={preview} alt="Prévia da capa" />
          </div>
        )}

        <button type="submit">Cadastrar</button>
        {enviado && <p className="mensagem-sucesso">✅ Filme cadastrado com sucesso!</p>}
      </form>
    </div>
  );
}
