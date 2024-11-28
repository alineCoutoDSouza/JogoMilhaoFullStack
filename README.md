# Simulador Jogo do Milhão

Este projeto é um simulador do famoso "Jogo do Milhão", implementado com React (usando Vite) no front-end e Django Rest Framework (DRF) no back-end, utilizando Swagger (drf_yasg) para documentar as APIs. Ele se conecta a um banco de dados PostgreSQL local.

## Pré-requisitos

Antes de começar, você precisa ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (você pode verificar a instalação com `node -v`)
- [Python 3.x](https://www.python.org/downloads/) (verifique com `python --version`)
- [PostgreSQL](https://www.postgresql.org/download/) (verifique com `psql --version`)

## Passos para rodar localmente

### 1. Clonar o repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/jogo-milhao.git
cd jogo-milhao
```

### 2. Configurar o banco de dados PostgreSQL

O sistema usa o PostgreSQL para armazenar os dados. Certifique-se de que o banco de dados PostgreSQL esteja instalado e rodando localmente.

1. Crie um banco de dados chamado `jogo-milhao` ou qualquer outro nome que preferir.

```bash
psql -U postgres
CREATE DATABASE jogo-milhao;
```

2. Atualize as credenciais de acesso ao banco de dados no arquivo `.env` (veja abaixo como configurar).

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente para o banco de dados. Você pode copiar e colar as configurações abaixo:

```env
DB_NAME=jogo-milhao
DB_USER=postgres
DB_PASSWORD=12345
DB_HOST=localhost
DB_PORT=5432
```

### 4. Rodando o back-end (Django + DRF)

Agora, vamos configurar o back-end usando Django e DRF:

#### Passo 1: Criar e ativar o ambiente virtual

Crie um ambiente virtual para o seu projeto e ative-o:

```bash
python -m venv venv
source venv/bin/activate  # No Windows, use 'venv\Scripts\activate'
```

#### Passo 2: Instalar as dependências do back-end

Instale as dependências necessárias usando `pip`:

```bash
cd back-milhao
pip install -r requirements.txt
```

#### Passo 3: Configurar o banco de dados no Django

Execute as migrações para criar as tabelas no banco de dados:

```bash
python manage.py migrate
```

#### Passo 4: Rodar o servidor Django

Execute o servidor Django para rodar a API:

```bash
python manage.py runserver
```

O servidor estará rodando em `http://127.0.0.1:8000`.

### 5. Rodando o front-end (React + Vite)

Agora, vamos configurar o front-end com React e Vite:

#### Passo 1: Instalar as dependências do front-end

Abra um novo terminal na raiz do projeto e entre na pasta do front-end:

```bash
cd front-milhao
```

Instale as dependências do projeto usando `npm` ou `yarn`:

```bash
npm install  # Ou 'yarn install'
```

#### Passo 2: Rodar o servidor de desenvolvimento

Execute o servidor de desenvolvimento do Vite:

```bash
npm run dev  # Ou 'yarn dev'
```

O front-end estará disponível em `http://localhost:5173`.

### 6. Acessando a documentação da API (Swagger)

A documentação da API está disponível em:

```
http://127.0.0.1:8000/swagger/
```

### 7. Testando a aplicação

Agora você pode acessar a aplicação no seu navegador:

- O front-end estará disponível em `http://localhost:5173`.
- A API estará disponível em `http://127.0.0.1:8000`.

Para testar, você pode jogar o "Jogo do Milhão" no front-end, e as interações serão processadas pela API no back-end, com os dados sendo armazenados no banco de dados PostgreSQL.

---

## Estrutura do projeto

O projeto possui duas partes principais:

1. **Backend (Django + DRF)** - Código da API, incluindo modelos, migrações, views, serializers, etc.
2. **Frontend (React + Vite)** - Interface do usuário do jogo.

---

## Dependências

### Backend

- Django
- Django Rest Framework
- drf_yasg (Swagger)
- psycopg2-binary (driver PostgreSQL para Python)
- python-decouple (para carregar variáveis de ambiente)

### Frontend

- React
- Vite (para bundling)
- Axios (para fazer requisições HTTP para o back-end)

---

## Contribuindo

Se você deseja contribuir para o projeto, faça um fork do repositório, crie uma branch, e envie um pull request com suas alterações.

---

## Licença

Este projeto é licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
