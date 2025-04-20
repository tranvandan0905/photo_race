FROM node:22 
WORKDIR /app
COPY services/topranking-service/package*.json /app/
COPY services/topranking-service /app/
RUN npm install
EXPOSE 3007  
CMD ["npm", "start"]