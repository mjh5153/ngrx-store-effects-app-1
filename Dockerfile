FROM node:8
WORKDIR /app
COPY . .
ENTRYPOINT ["npm", "start"]
