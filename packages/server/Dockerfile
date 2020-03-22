FROM node

WORKDIR /server

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g nodemon --silent

COPY . .
RUN npm install

CMD nodemon server