FROM node:18

WORKDIR /app

RUN npm install --force -g yarn

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]