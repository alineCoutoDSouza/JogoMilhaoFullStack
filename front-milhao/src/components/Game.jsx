import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRandomQuestion, validateAnswer } from '../api/api';

function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [pontuacao, setPontuacao] = useState(0);
  const [nivel, setNivel] = useState('F');  // Nível de dificuldade (Fácil)
  const [questionsAnswered, setQuestionsAnswered] = useState(0);  // Para contar as perguntas respondidas
  const [totalQuestionsInLevel, setTotalQuestionsInLevel] = useState(0);  // Total de perguntas do nível atual

  const { playerId, nome } = location.state;

  // Função para buscar as perguntas e contar quantas existem no nível atual
  useEffect(() => {
    fetchQuestions();
  }, [nivel]);

  // Busca todas as perguntas do nível atual
  const fetchQuestions = () => {
    getRandomQuestion(nivel).then((response) => {
      const questions = response.data;
      setTotalQuestionsInLevel(questions.length); // Total de perguntas do nível
      setQuestionsAnswered(0);  // Reseta o contador de perguntas respondidas
      setQuestion(questions); // Coloca a primeira pergunta do nível
    }).catch((error) => {
      console.error('Erro ao buscar perguntas:', error);
    });
  };

  const handleAnswer = () => {
    if (!selectedAnswer) {
      return; // Se não tiver resposta selecionada, não faz nada
    }

    validateAnswer(question.id, selectedAnswer).then((response) => {
      if (response.data.status === 'correto') {
        setPontuacao(pontuacao + 10); // Aumenta a pontuação
      }
      
      // Atualiza o número de perguntas respondidas
      setQuestionsAnswered(questionsAnswered + 1);

      // Avança para a próxima pergunta
      if (questionsAnswered + 1 < totalQuestionsInLevel) {
        // Se ainda tiver perguntas no nível, mostra a próxima
        setQuestion((prevQuestion) => response.data.nextQuestion);
      } else {
        // Se completou todas as perguntas do nível
        if (nivel === 'F') {
          setNivel('M');  // Avança para o próximo nível (Médio)
        } else if (nivel === 'M') {
          setNivel('D');  // Avança para o nível difícil
        } else {
          // Se já tiver completado todos os níveis, vai para o Game Over
          navigate('/gameover', { state: { playerId, nome, pontuacao } });
        }
      }
    }).catch((error) => {
      console.error('Erro ao validar resposta:', error);
    });
  };

  return (
    <div>
      <h1>{nome} - Pontuação: {pontuacao}</h1>
      {question && (
        <div>
          <p>{question.texto}</p>
          <div>
            <button onClick={() => setSelectedAnswer('A')}>{question.alternativa_a}</button>
            <button onClick={() => setSelectedAnswer('B')}>{question.alternativa_b}</button>
            <button onClick={() => setSelectedAnswer('C')}>{question.alternativa_c}</button>
            <button onClick={() => setSelectedAnswer('D')}>{question.alternativa_d}</button>
          </div>
          <button onClick={handleAnswer}>Enviar Resposta</button>
        </div>
      )}
    </div>
  );
}

export default Game;
