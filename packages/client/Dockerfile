FROM node

WORKDIR /client

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /client/
RUN yarn

COPY ./src/ /client/src/
COPY ./public/ /client/public/

CMD bash