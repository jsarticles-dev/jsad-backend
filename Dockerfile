
FROM node:16.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env.production .env


ENV NODE_ENV=production


RUN npm run build

CMD ["npm", "start"]