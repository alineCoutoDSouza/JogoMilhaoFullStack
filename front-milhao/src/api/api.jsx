import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Substitua com o URL da sua API Django
});

export const getRandomQuestion = (nivel) => {
  return api.get(`/pergunta/random/${nivel}/`);
};

export const validateAnswer = (perguntaId, resposta) => {
  return api.post('/validar-resposta/', { pergunta_id: perguntaId, resposta: resposta });
};

export const registerPlayer = (nome) => {
  return api.post('/registrar-jogador/', { nome: nome });
};

export const getRanking = () => {
  return api.get('/ranking/');
};

export const updatePlayerScore = (jogadorId, score) => {
  return api.put(`/atualizar-pontuacao/${jogadorId}/`, { pontuacao: score });
};