
FROM node:22 
WORKDIR /app
COPY services/topic-service/package*.json /app/
COPY services/topic-service /app/
RUN npm install
EXPOSE 3004 
CMD ["npm", "start"]
