FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g nodemon
VOLUME /app
COPY . /app
CMD [“nodemon”, “server.js”]
EXPOSE 4000
