import { useState } from 'react';

export default function Login({ onLoginSucesso }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.erro || 'Erro no login');
        return;
      }

      // Salva token no localStorage
      localStorage.setItem('token', data.token);

      // Passa usuário para o pai (ou faz redirecionamento)
      onLoginSucesso(data.usuario);

    } catch {
      setErro('Erro inesperado ao conectar');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
      {erro && <p style={{color: 'red'}}>{erro}</p>}
    </form>
  );
}
