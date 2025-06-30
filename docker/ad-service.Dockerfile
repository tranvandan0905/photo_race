
FROM node:22 
WORKDIR /app
COPY services/ad-service/package*.json /app/
COPY services/ad-service /app/
RUN npm install
EXPOSE 3009
CMD ["npm", "start"]