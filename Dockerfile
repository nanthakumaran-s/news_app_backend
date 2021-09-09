FROM node:14.17.6-buster-slim

RUN apt-get update && \ 
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \
    libc6-dev
WORKDIR /nodejs/app

COPY package*.json ./
RUN npm install pm2 -g
RUN npm install --production

COPY . .
CMD ["pm2-runtime", "index.js"]