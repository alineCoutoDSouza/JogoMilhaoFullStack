from rest_framework import serializers
from .models import Pergunta, Jogador, Partida

class PerguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pergunta
        fields = '__all__'

class JogadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogador
        fields = ['id', 'nome', 'pontuacao']

class PartidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partida
        fields = ['id', 'jogador', 'data_inicio', 'pontuacao_final', 'nivel_atual']
