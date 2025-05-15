FROM node:alpine

RUN mkdir -p /app/

COPY package.json /app/
COPY package-lock.json /app/

WORKDIR /app/

COPY .. /app/

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]

