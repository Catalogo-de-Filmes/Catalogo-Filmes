import { useState, useEffect } from 'react';

export default function AdicionarFilme() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [avaliacao, setAvaliacao] = useState('');
  const [ondeAssistir, setOndeAssistir] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
  const [capaArquivo, setCapaArquivo] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Carregar categorias do backend
  useEffect(() => {
    fetch('/categorias') // ajuste a URL conforme seu backend
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(() => setMensagem('Erro ao carregar categorias'));
  }, []);

  // Upload para Cloudinary (exemplo genérico)
  async function uploadCapa() {
    if (!capaArquivo) return '';

    const formData = new FormData();
    formData.append('file', capaArquivo);
    formData.append('upload_preset', 'meu_preset');

    const res = await fetch('https://api.cloudinary.com/v1_1/dt7v8ypvh/image/upload', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) throw new Error('Falha no upload da imagem');

    const data = await res.json();
    return data.secure_url;
  }

  async function handleSubmit(e) {
  e.preventDefault();
  setMensagem('');
  setCarregando(true);

  try {
    // Faz upload da capa e pega URL
    const capaUrl = await uploadCapa();

    const body = {
      nome,
      descricao,
      avaliacao: Number(avaliacao),
      ondeAssistir,
      capaUrl,
      usuarioId: 1, // ajuste conforme usuário logado
      categoriasIds: categoriasSelecionadas.map(id => Number(id))
    };

    // PEGA O TOKEN JWT DO localStorage
    const token = localStorage.getItem('token');

    // ENVIA O TOKEN NO HEADER Authorization
    const res = await fetch('/filmes', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // <-- aqui está o token
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error('Erro ao salvar filme');

    setMensagem('Filme adicionado com sucesso!');
    // limpar formulário
    setNome('');
    setDescricao('');
    setAvaliacao('');
    setOndeAssistir('');
    setCategoriasSelecionadas([]);
    setCapaArquivo(null);
  } catch (err) {
    setMensagem(err.message || 'Erro inesperado');
  } finally {
    setCarregando(false);
  }
}

   return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Adicionar Filme</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="avaliacao">Avaliação (0-10)</label>
          <input
            id="avaliacao"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={avaliacao}
            onChange={e => setAvaliacao(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="ondeAssistir">Onde Assistir</label>
          <input
            id="ondeAssistir"
            type="text"
            value={ondeAssistir}
            onChange={e => setOndeAssistir(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="categorias">Categorias</label>
          <select
            id="categorias"
            multiple
            value={categoriasSelecionadas}
            onChange={e => {
              const options = Array.from(e.target.selectedOptions);
              setCategoriasSelecionadas(options.map(o => o.value));
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="capa">Capa</label>
          <input
            id="capa"
            type="file"
            accept="image/*"
            onChange={e => setCapaArquivo(e.target.files[0])}
            required
          />
        </div>

        <button
          type="submit"
          disabled={carregando}
          className={`px-4 py-2 rounded text-white ${carregando ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {carregando ? 'Salvando...' : 'Adicionar Filme'}
        </button>
      </form>

      {mensagem && <p className="mt-4 font-semibold text-center">{mensagem}</p>}
    </div>
  );
}