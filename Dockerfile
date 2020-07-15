FROM node:13.8.0-alpine3.10

ENV PORT 3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
RUN npm audit fix


# Bundle app source
COPY . /usr/src/app

RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]
