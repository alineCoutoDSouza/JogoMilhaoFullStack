import React, { useEffect, useState } from 'react';
import { getRanking } from '../api/api'; // Função para buscar o ranking da API
import { useNavigate } from 'react-router-dom';

function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Função para buscar o ranking
  useEffect(() => {
    getRanking()
      .then((response) => {
        setRanking(response.data);  // Armazena os dados do ranking
        setLoading(false);           // Finaliza o carregamento
      })
      .catch((error) => {
        console.error('Erro ao buscar o ranking:', error);
        setLoading(false);
      });
  }, []);

  // Renderiza a lista de ranking
  const renderRanking = () => {
    if (loading) {
      return <p>Carregando o ranking...</p>;
    }

    if (ranking.length === 0) {
      return <p>Ainda não há jogadores no ranking.</p>;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Jogador</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.nome}</td>
              <td>{item.pontuacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Ranking - Show do Milhão</h1>
      {renderRanking()}
      <button onClick={() => navigate('/')}>Voltar à Tela Inicial</button>
    </div>
  );
}

export default Ranking;
