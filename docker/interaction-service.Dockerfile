FROM node:22 
WORKDIR /app
COPY services/interaction-service/package*.json /app/
RUN npm install
COPY services/interaction-service /app/
EXPOSE 3006 
CMD ["npm", "start"]
