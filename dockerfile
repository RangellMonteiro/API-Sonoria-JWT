FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript
RUN npm run build

# Exposição da porta
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
