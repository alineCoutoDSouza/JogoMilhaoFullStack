from django.urls import path
from . import views

urlpatterns = [
    path('pergunta/random/<str:nivel>/', views.pergunta_random, name='pergunta_random'),
    path('validar-resposta/', views.validar_resposta, name='validar_resposta'),
    path('registrar-jogador/', views.registrar_jogador, name='registrar_jogador'),
    path('ranking/', views.ranking, name='ranking'),
    path('register-pergunta/', views.register_pergunta, name='register_pergunta'),
    path('atualizar-pontuacao/<int:pk>/', views.atualizar_pontuacao, name='atualizar_pontuacao/')
]
