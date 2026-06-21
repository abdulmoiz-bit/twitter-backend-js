FROM node:20.20.0-alpine3.22
USER app
WORKDIR /app
RUN mkdir data
COPY package*.json .
RUN npm install
COPY . . 
EXPOSE 5013
CMD ["npm", "run", "start"] 
 