FROM node:24-alpine3.23 

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && adduser -S app -u 1001

COPY package*.json ./

RUN npm install

COPY --chown=app:nodejs . .

USER app

EXPOSE 5002

CMD ["npm", "run", "start"] 
 