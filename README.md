<div align="center" >
  <img alt="Logo IgniteGYM" title="Ignite" src="./src/assets/logo.svg">
</div>
<br>

# IgniteGYM

Aplicação desenvolvida durante o bootcamp de especialização em ReactNative. A aplicação utiliza dois tipos de navegação: StackNavigator e BottomTabNavigator, além de ter rotas privadas (auth.routes) e rotas públicas (app.routes).
Para maior produtividade e customizações é utilizado o native-base como component Library.

<p align="center">
  <img src="https://i.imgur.com/1hLvWfk.png" alt="Exemplo da Aplicação">
</p>

## Telas da aplicação
- [x] SignIn
- [x] Register
- [x] Home
- [x] History
- [x] Exercises
- [x] Profile

## Bibliotecas utilizads
- @react-navigation/native
- @react-navigation/native-stack
- @react-navigation/bottom-tabs
- react-native-safe-area-context
- react-native-screens
- react-native-svg
- expo-image-picker
- expo-file-system
- react-native-async-storage/async-storage

## Requisitos funcionais
O que é possível que o usuário faça na aplicação.

- [x] Deve ser possível se cadastrar na aplicação
- [x] Deve ser possível realizar autenticação
- [x] Deve ser possível obter o perfil de um usuário autenticado
- [x] Deve ser possível obter o histórico de exercícios realizados
- [x] Deve ser possível obter os exercícios com base nos grupos musculares
- [x] Deve ser possível marcar como realizado um exercício
- [x] Deve ser possível realizar a alteração da senha
- [x] Deve ser possível realizar a troca da imagem de perfil do usuário

## Regras de negócio
- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [x] A imagem de perfil do usuário não deve poder ter tamanho superior a 15MB
- [x] Usuários não autenticados não podem ter acesso as rotas da aplicação


## Requisitos não funcionais
- [x] A senha do usuário precisa estar criptografada
- [x] A senha do usuário deve ter ao menos 6 caracteres
- [x] Os dados da aplicação precisam ser persistidos
- [x] O usuário deve ser identificado por um JWT
- [x] As rotas de autenticação devem ser StackNavigator
- [x] As rotas da aplicação devem ser TabNavigator

## 🎯 Layout do projeto

- [Figma](https://www.figma.com/community/file/1163926136397847279)

## ✔️ Autores

- [Renan Fachin](https://github.com/RenanFachin/)

## 📄 Professores

- [Rodrigo Gonçalves](https://github.com/rodrigorgtic)

## 📄 Referência

- [Rockeseat](https://www.rocketseat.com.br/)