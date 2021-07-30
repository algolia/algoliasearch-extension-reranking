FROM node:12-alpine

COPY src/index.js .

ENTRYPOINT ["node", "index.js"]
