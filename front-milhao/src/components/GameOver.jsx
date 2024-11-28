import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRanking, updatePlayerScore } from '../api/api';

function GameOver() {
  const navigate = useNavigate();
  const location = useLocation();
  const { playerId, nome, pontuacao } = location.state;

  const handleViewRanking = () => {
    getRanking().then(async (response) => {
      console.log('Ranking:', response.data);
      await updatePlayerScore(playerId, pontuacao);
      navigate('/ranking');
    });
  };

  return (
    <div>
      <h1>Fim de Jogo</h1>
      <p>{nome}, sua pontuação foi: {pontuacao}</p>
      <button onClick={handleViewRanking}>Ver Ranking</button>
      <button onClick={() => navigate('/')}>Voltar à Tela Inicial</button>
    </div>
  );
}

export default GameOver;
