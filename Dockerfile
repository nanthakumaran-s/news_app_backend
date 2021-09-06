FROM node:14.17.6-alpine

WORKDIR /nodejs/app

COPY package*.json ./
RUN npm install
RUN npm install pm2 -g

COPY . .
CMD ["pm2-runtime", "index.js"]