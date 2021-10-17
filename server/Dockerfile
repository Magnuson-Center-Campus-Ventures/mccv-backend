FROM node:14

ENV PATH ./node_modules/.bin:$PATH

RUN mkdir /server
WORKDIR /server

COPY . .

RUN yarn install

EXPOSE 80
EXPOSE 9090

CMD ["yarn", "start"]
