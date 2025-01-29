## Especificações

- [Node versão 20.xx](https://nodejs.org/en/download/package-manager)
- [Docker versão 27.x.x ](https://docs.docker.com/engine/install/)


## Como inicializar o projeto
### Configura .env
- Crie um arquivo `.env` na raiz do projeto
- Coloque as variáveis de ambiente no arquivo, é possível ver os exemplos das variáveis no arquivo [.env.example](https://gitlab.com/gioconda/sonoria/api-sonoria/-/blob/main/.env.example?ref_type=heads)

> **Aviso**: Caso utilize o gerenciador de versões do Node [nvm](https://github.com/nvm-sh/nvm), utilize o comando `nvm use` na raiz do projeto para usar a versão do Node definida para o projeto.



```bash
npm i #instalar dependências

npm run database:up #levantar container do banco

npx prisma migrate dev #criar tabelas com bases nas migrates

npm run dev #executar projeto em desenvolvimento
```

## Rotas

- http://localhost:{PORT}/usuario
```curl
curl --location --globoff '{{url}}/usuario' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nome":"José Pereira da Silva",
    "cpf":"1221.256.283-22",
    "email":"asdas@gmail.com",
    "senha": "2923001928",
    "data_nascimento":"2024-10-16T14:30:00+02:00",
    "sexo":"Masculino",
    "tipo":"professor",
    "registro_conselho":"123123",
    "especialidade": "radiologia"
}'
```

 