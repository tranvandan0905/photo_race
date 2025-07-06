
FROM node:22 
WORKDIR /app
COPY services/banking-service/package*.json /app/
COPY services/banking-service /app/
RUN npm install
EXPOSE 3010
CMD ["npm", "start"]