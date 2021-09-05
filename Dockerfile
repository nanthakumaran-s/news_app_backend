FROM node:14.17.6-alpine

WORKDIR /nodejs/app

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]