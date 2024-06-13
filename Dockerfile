# Etapa de build
FROM node:20 as build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Copiar o restante do código
COPY . .

# Instalar dependências
RUN npm install

# Construir a aplicação
RUN npm run build

# Definir variáveis de ambiente
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Expor a porta
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "run", "start"]

