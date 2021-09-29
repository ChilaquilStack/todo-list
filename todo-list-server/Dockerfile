FROM node:alpine

LABEL DESCRIPTION="This image is for running express" AUTHOR="Edgar Villegas" CONTACT="contact@eddievillegas.com"

WORKDIR /app

COPY package*.json /app

RUN npm i

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]