FROM node:23-alpine@sha256:139be64e98a1374a1c49ee62b23a91f688a37a628422ff8bb9fba94185678ab3

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Variables de entorno para Vite (HMR)
ENV HOST=0.0.0.0 
ENV PORT=8081

EXPOSE 8081

CMD ["npm", "run", "dev"]
