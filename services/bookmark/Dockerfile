FROM node:24-alpine3.23 
USER app
WORKDIR /app
RUN mkdir data
COPY package*.json .
RUN npm install
COPY . . 
EXPOSE 5009
CMD ["npm", "run", "start"] 
 