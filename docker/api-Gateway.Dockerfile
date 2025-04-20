FROM node:22 
WORKDIR /app
COPY services/api-gateway/package*.json /app/
RUN npm install
COPY services/api-gateway /app/
EXPOSE 3001  
CMD ["npm", "start"]
