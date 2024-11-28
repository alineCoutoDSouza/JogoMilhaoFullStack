from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Pergunta, Jogador, Partida
from .serializers import PerguntaSerializer, JogadorSerializer, PartidaSerializer
import random
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


# Rota para obter uma pergunta aleatória baseado no nível de dificuldade
@swagger_auto_schema(
    method="get",
    manual_fields=[
        openapi.Parameter(
            "nivel",
            openapi.IN_PATH,
            description="Nível de dificuldade",
            type=openapi.TYPE_STRING,
            enum=["F", "M", "D"],
        )
    ],
)
@api_view(["GET"])
def pergunta_random(request, nivel):
    try:
        perguntas = Pergunta.objects.filter(nivel=nivel)
        if perguntas.exists():
            pergunta = random.choice(perguntas)
            serializer = PerguntaSerializer(pergunta)
            return Response(serializer.data)
        return Response(
            {"message": "Nenhuma pergunta encontrada para este nível"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# Rota para validar a resposta do jogador
@swagger_auto_schema(method="post",
                      request_body=openapi.Schema(
                          type=openapi.TYPE_OBJECT,
                          properties={
                              "pergunta_id": openapi.Schema(type=openapi.TYPE_INTEGER),
                              "resposta": openapi.Schema(type=openapi.TYPE_STRING),
                          }
                      ))
@api_view(["POST"])
def validar_resposta(request):
    try:
        pergunta_id = request.data.get("pergunta_id")
        resposta = request.data.get("resposta")

        pergunta = Pergunta.objects.get(id=pergunta_id)
        print(pergunta.resposta_correta, resposta)
        if pergunta.resposta_correta == resposta:
            return Response({"mensagem": "Resposta correta!", "status": "correto"})
        else:
            return Response({"mensagem": "Resposta incorreta!", "status": "errado"})
    except Pergunta.DoesNotExist:
        return Response(
            {"message": "Pergunta não encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# Rota para registrar um jogador
@swagger_auto_schema(method="post", request_body=JogadorSerializer)
@api_view(["POST"])
def registrar_jogador(request):
    try:
        nome = request.data.get("nome")
        jogador = Jogador.objects.create(nome=nome)
        return Response(
            {"id": jogador.id, "nome": jogador.nome}, status=status.HTTP_201_CREATED
        )
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# Rota para exibir o ranking
@api_view(["GET"])
def ranking(request):
    jogadores = Jogador.objects.all().order_by("-pontuacao")[:10]
    serializer = JogadorSerializer(jogadores, many=True)
    return Response(serializer.data)

@swagger_auto_schema(method="post", request_body=PerguntaSerializer)
@api_view(["POST"])
def register_pergunta(request):
    serializer = PerguntaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@swagger_auto_schema(method="put",
                     request_body=openapi.Schema(
                         type=openapi.TYPE_OBJECT,
                         properties={
                             "pontuacao": openapi.Schema(type=openapi.TYPE_INTEGER),
                         }
                     ))
@api_view(["PUT"])
def atualizar_pontuacao(request, pk):
    try:
        jogador = Jogador.objects.get(pk=pk)
        pontuacao = request.data.get("pontuacao")
        jogador.pontuacao = pontuacao
        jogador.save()
        return Response({"message": "Pontuação atualizada com sucesso!"}, status=status.HTTP_200_OK)
    except Jogador.DoesNotExist:
        return Response({"message": "Jogador não encontrado"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)