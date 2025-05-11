FROM node:alpine

WORKDIR /app

# Copiar solo los archivos de dependencias primero
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

EXPOSE 8081

# Nota: El comando final se sobrescribe en docker-compose.yml
CMD ["npm", "run", "dev"]