# Desafio Frontend HiPlatform

Este projeto é uma implementação de um componente de árvore interativa como parte do desafio frontend da HiPlatform. Cada item da árvore pode ter itens filhos aninhados, e os usuários podem mostrar/esconder os filhos, bem como marcar/desmarcar itens com mudanças de estado em cascata.

## Demonstração ao Vivo

A demonstração ao vivo do projeto está hospedada na Vercel: [https://vercel.hiplatform](https://vercel.hiplatform)

## Funcionalidades

- Cada item possui um checkbox para seleção.
- Marcar/desmarcar um item com filhos propaga o estado para todos os descendentes.
- O checkbox do item pai torna-se indeterminado quando alguns, mas não todos, os filhos estão marcados.
- O checkbox do item pai reflete o estado de todos os filhos quando todos estão marcados/desmarcados.
- Os usuários podem alternar a visibilidade dos itens filhos de um item pai.

## Instalação

Para instalar o projeto, siga estes passos:

1. Clone o repositório:
   
   git clone https://github.com/seu-usuario/hiplatform-challenge.git
   
   cd hiplatform-challenge

3. Instale as dependências:
 
   npm install

## Executando o Projeto

Para executar o projeto localmente, execute:
npm start

Isso iniciará o servidor de desenvolvimento e abrirá o projeto no seu navegador padrão.

## Executando os Testes

Para executar a suíte de testes, utilize o comando:
npm test

Obrigado por conferir este projeto!
