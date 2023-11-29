FROM node:latest

RUN apt-get update && apt-get install -y r-base

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build
RUN npm install -g next@13.5.6

EXPOSE 3000

CMD ["next", "start", "-p", "3000"]