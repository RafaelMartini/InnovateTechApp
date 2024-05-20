<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Innovatetechapp" />

&#xa0;

  <!-- <a href="https://innovatetechapp.netlify.app">Demo</a> -->
</div>

<h1 align="center">Innovatetechapp</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/RafaelMartini/innovatetechapp?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/RafaelMartini/innovatetechapp?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/RafaelMartini/innovatetechapp?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/RafaelMartini/innovatetechapp?color=56BEB8">

  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/RafaelMartini/innovatetechapp?color=56BEB8" /> -->

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/RafaelMartini/innovatetechapp?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/RafaelMartini/innovatetechapp?color=56BEB8" /> -->
</p>

<!-- Status -->

<!-- <h4 align="center">
	🚧  Innovatetechapp 🚀 Under construction...  🚧
</h4>

<hr> -->

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/RafaelMartini" target="_blank">Author</a>
</p>

<br>

## :dart: About

O InnovateTechApp é uma aplicação móvel desenvolvida para a InnovateTech que simplifica a gestão e visualização de informações de estudantes de maneira eficiente e interativa, utilizando dados da API RandomUser

<div align="center" id="top"> 
  <img src="./assets/appCaptura.png" alt="Innovatetechapp" />
  <img src="./assets/appCaptura2.png" alt="Innovatetechapp" />
  <img src="./assets/darkMode.png" alt="Innovatetechapp" />
  <img src="./assets/darkModeGender.png" alt="Innovatetechapp" />
  <img src="./assets/CarregarMais.png" alt="Innovatetechapp" />
</div>

## :sparkles: Features

:heavy_check_mark: **Feature 1: Tela de Carregamento Inicial**  
Exibição da logo da InnovateTech enquanto o aplicativo carrega.

:heavy_check_mark: **Feature 2: Listagem Paginada de Alunos**  
Exibição dos alunos com uma paginação que carrega 20 alunos por vez, com carregamento adicional ao atingir o final da lista.

:heavy_check_mark: **Feature 3: Filtragem de Alunos**  
Funcionalidade de pesquisa que permite filtrar alunos pelo primeiro ou segundo nome através de uma barra de busca.

:heavy_check_mark: **Feature 4: Visualização Detalhada de Alunos**  
Ao selecionar um aluno, um modal deve ser aberto mostrando detalhes como imagem, nome completo, email, gênero, data de nascimento, telefone, nacionalidade, endereço e ID.

:heavy_check_mark: **Feature 5: Filtro por Gênero**  
Um filtro adicional na listagem para selecionar alunos por gênero.

:heavy_check_mark: **Feature 6: Cache de Dados**  
Após o primeiro carregamento dos dados, armazenar as informações no cache interno do dispositivo para acesso rápido sem necessidade de nova consulta à API em reinicializações subsequentes.

:heavy_check_mark: **Feature 7: Gerenciamento de Estado**  
Uso do Redux para manejar o estado global da aplicação.

:heavy_check_mark: **Feature 8: Botão de subir a lista**  
Criei um botão para subir o FlatList sem precisar dr scrool para cima, com 1 click o usuário chega ao topo da lista.

:heavy_check_mark: **Feature 9: Thema Dark e Ligth**  
Para melhorar a experiência do usuário e melhorar a visibilidade em ambientes escuros, criei um botão superior lateral para mudar para thema claro e escuro.

:heavy_check_mark: **Feature 10: Tradução de inglês para português**  
Traduzi o tudo o que vinha de inglês do endpoint para português dinamicamente.

## :rocket: Technologies

The following tools were used in this project:

-   [Expo](https://expo.io/)
-   [Node.js](https://nodejs.org/en/)
-   [React](https://pt-br.reactjs.org/)
-   [React Native](https://reactnative.dev/)
-   [TypeScript](https://www.typescriptlang.org/)

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting

```bash
# Clone o projeto
$ git clone https://github.com/RafaelMartini/innovatetechapp

# Acesse a pasta innovatetechapp
$ cd innovatetechapp

# Instale as dependências
$ yarn install

# Rode o projeto
$ npx expo start

# Use a porta <http://localhost:8081> para acessar via webpage no navegador

# Ou use o app oficial Expo Go, que você consegue instalar na Apple Store ou Play Store, após baixar o app, scaneie o Qr Code, estando na mesma rede wi-fi ele irá iniciar o projeto, não se esqueça do comando para rodar npx expo start
```

## :memo: License

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.

Made with :heart: by <a href="https://github.com/RafaelMartini" target="_blank">Rafael Martini</a>

&#xa0;

<a href="#top">Back to top</a>
