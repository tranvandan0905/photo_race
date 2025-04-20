FROM node:22 
WORKDIR /app
COPY services/auth-service/package*.json /app/
RUN npm install
COPY services/auth-service /app/
EXPOSE 3008  
CMD ["npm", "start"]