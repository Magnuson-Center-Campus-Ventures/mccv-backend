FROM node:14

ENV PATH ./node_modules/.bin:$PATH

ARG APP_PORT=9090

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn install

EXPOSE $PORT
EXPOSE 9090

CMD ["yarn", "start"]
