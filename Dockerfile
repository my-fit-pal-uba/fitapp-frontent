FROM node:alpine 

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8081

CMD ["sh", "-c", "npm install && npm run dev"]