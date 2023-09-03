FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY AIC-API/package*.json ./

RUN npm install
RUN npm install -g nodemon
# Bundle app source
COPY AIC-API/ .

EXPOSE 3000
CMD [ "npm","run","start:dev" ]
