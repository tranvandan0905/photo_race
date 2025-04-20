FROM node:22 
WORKDIR /app
COPY services/submission-service/package*.json /app/
RUN npm install
COPY services/submission-service /app/
EXPOSE 3005 
CMD ["npm", "start"]
