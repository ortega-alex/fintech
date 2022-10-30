FROM node:16.18-alpine3.15

WORKDIR /api
COPY package*.json ./
# COPY ./api .
RUN npm install
# RUN npm install -g nodemon
COPY . . 
EXPOSE 4000
CMD [ "npm", "dev" ]