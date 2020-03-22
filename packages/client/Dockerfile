FROM node

WORKDIR /client

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g serve --silent

COPY ./build/ .


CMD serve -l 3000 -s .