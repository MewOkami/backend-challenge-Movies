# Backend-challenge-Movies

Desafio para uma vaga de backend, a função é desenvolver um CRUD de um catálogo de filmes. Todos os endpoints dessa CRUD são consumidos por um usuário autenticado.

# Sobre o Projeto

Realizei o projeto como foi pedido, mas acrescentei algumas coisas como segurança de rotas mais avançadas.
As rotas além da Authenticação obrigatoria algumas delas presisa que o usuario seja Admin para ultilizar, como por exemplo o caso de criar, editar e excluir um filme, nessas rotas é preciso ser admin para realiza-las, outras rotas realizei uma logica de segurança de usuario, basicamente o usuario só pode realizar ações que lhe pertencem, por exemplo nas rotas de atualização e remoção o usuario só consegue alterar ou apagar suas proprias informações e na rota de retorno de todos os usuarios, o usuario só consegue ver a si mesmo, mas caso o usuario seja admin, o admin tem permissão para ver e alterar todos os usuarios, bem como as rotas de filmes também.

Importante resaltar também que na criação de um usuario o campo isAdmin não é obrigatorio, sendo seu valor default como Falso.
A senhas de usuarios são hasheadas e não retornam no corpo da requisição.

# Bibliotecas

Nesse projeto ultilizei o auxílio de varias bibliotecas, algumas do proprio nest outras fora no nest. Segue abaixo a lista das lib ultilizadas.

- passport-jwt
- passport
- swagger
- prisma
- bcryptjs

# Database

Estou Ultilizando um banco de dados PostgreSQL do Neon

# Considerações finais

Em geral achei muito divertido esse projeto, e como da pra notar tenho bastante experiencia com projetos assim, ultilizo essas ferramentas a mais de um ano e já realizei diversos tipos de desafios diferentes. Obrigada pela oportunidade de mostrar minhas habilidades, foi realmente muito divertido!
