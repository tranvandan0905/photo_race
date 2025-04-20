
FROM node:22 
WORKDIR /app
COPY services/media-service/package*.json /app/
RUN npm install
COPY services/media-service /app/
EXPOSE 5000 
CMD ["npm", "start"]
