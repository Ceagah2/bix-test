# Bix front end test

Bem-vindo ao meu teste para a vaga de desenvolvedor front end da empresa Bix.

## 🚀 Visão Geral

Esse teste tem como ponto principal o acesso ao dashboard do usuario onde ele podera verificar todas as transacoes financeiras
da sua empresa, podendo aplicar filtros para ter mais detalhes sobre as transacoes.

## 🎯 Funcionalidades Principais

- Chamada do servico para renderizar os dados das transacoes
- Platagem do grafico financeiro, com base nos filtros que o usuario escolheu.
- Protecao do dashboard por uma tela de login
- Criacao de uma conta para o usuario

## 🛠️ Tecnologias Utilizadas

Aqui estão as principais tecnologias e ferramentas.

- Next.Js
- Typescript
- MUI
- Husky
- Clean Architecture

## 🛠️ Instalação

Siga os passos abaixo para rodar o projeto localmente:

Pré-requisitos

- Node.js (>= 14.x)
- Expo CLI (>= 5.x)
- Yarn ou NPM

Passo a Passo

- Clone o repositório:

```bash
git clone https://github.com/seu-usuario/bix-test
```

- Acesse o diretório do projeto:

```bash
cd bix-test
```

- Instale as dependências:

```bash
yarn install
# ou
npm install
```

- Inicie o projeto:

```bash
yarn dev
# ou
npm run dev
```

Abra o app no seu emulador ou diretamente no seu dispositivo via Expo Go.

## 📂 Estrutura do Projeto

```bash
│── app
│   ├── dashboard/
│   ├── login/
│   ├── signup/
│   ├ globals.css
│   ├ layout.tsx
│   ├ page.tsx
│
├── src
│   ├── application/      # Casos de uso
│   ├── data/             # Arquivo json que simula o backend
│   ├── domain/           # Entidades e criacao dos servicos com base no consumo da api
│   ├── infra/            # Simulacao do consumo da API
│   ├── presentation/     # Componentes visuais, temas, hooks de UI
│   └── validation/       # Validacoes de login e criacao de conta
│
└── README.md
```

**Clean Architecture:**
_application:_ Contem os casos de uso dos filtros
_data:_ Acesso a bancos de dados.  
_domain:_ Contém as regras de negócio puras.
_infra:_ Simulacao da chamada à API
_presentation:_ Tudo relacionado à UI/UX e apresentação de dados.
_validation:_ Validacao dos formularios

## 📄 Documentação

Para detalhes sobre cada módulo e funcionalidade, consulte a Documentação Completa.
Caso tenha dúvidas específicas sobre a arquitetura, confira o guia de [Clean Architecture aqui](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## 🔗 Links Úteis

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)  
- [Clean Architecture aqui](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
- [Next.js](https://nextjs.org/)  
- [TypeScript](https://www.typescriptlang.org/)

## 🤝 Contato

Se tiver alguma dúvida ou quiser conversar sobre o projeto, entre em contato:

Carlos Henrique  
[GitHub](https://github.com/Ceagah2) | [Email](mailto:carlosceagah@gmail.com) | [Linkedin](https://linkedin.com/in/carlosceagah)  
