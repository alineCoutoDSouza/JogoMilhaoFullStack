from django.db import models

# Create your models here.
from django.db import models

class Pergunta(models.Model):
    nivel_choices = [
        ('F', 'Fácil'),
        ('M', 'Médio'),
        ('D', 'Difícil'),
    ]
    
    texto = models.CharField(max_length=255)
    nivel = models.CharField(max_length=1, choices=nivel_choices)
    alternativa_a = models.CharField(max_length=255)
    alternativa_b = models.CharField(max_length=255)
    alternativa_c = models.CharField(max_length=255)
    alternativa_d = models.CharField(max_length=255)
    resposta_correta = models.CharField(max_length=1)  # A, B, C, D
    
    def __str__(self):
        return self.texto

class Jogador(models.Model):
    nome = models.CharField(max_length=100)
    pontuacao = models.IntegerField(default=0)
    
    def __str__(self):
        return self.nome

class Partida(models.Model):
    jogador = models.ForeignKey(Jogador, on_delete=models.CASCADE)
    data_inicio = models.DateTimeField(auto_now_add=True)
    pontuacao_final = models.IntegerField(default=0)
    nivel_atual = models.CharField(max_length=1, choices=Pergunta.nivel_choices)
    
    def __str__(self):
        return f"Partida de {self.jogador.nome} - {self.pontuacao_final} pontos"
