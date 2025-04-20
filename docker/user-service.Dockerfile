
FROM node:22 
WORKDIR /app
COPY services/user-service/package*.json /app/
COPY services/user-service /app/
RUN npm install
EXPOSE 3003 
CMD ["npm", "start"]
