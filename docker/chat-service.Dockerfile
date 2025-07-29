
FROM node:22 
WORKDIR /app
COPY services/chat-service/package*.json /app/
COPY services/chat-service /app/
RUN npm install
EXPOSE 3012
CMD ["npm", "start"]