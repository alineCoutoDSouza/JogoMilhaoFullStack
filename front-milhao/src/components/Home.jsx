import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerPlayer } from '../api/api';

function Home() {
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (nome.trim()) {
      registerPlayer(nome).then((response) => {
        navigate('/game', { state: { playerId: response.data.id, nome } });
      }).catch((error) => {
        console.error('Erro ao registrar jogador:', error);
      });
    } else {
      alert('Por favor, insira um nome!');
    }
  };

  return (
    <div>
      <h1>Show do Milhão</h1>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite seu nome"
      />
      <button onClick={handleStartGame}>Iniciar Jogo</button>
    </div>
  );
}

export default Home;
