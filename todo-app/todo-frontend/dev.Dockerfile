FROM node:16

WORKDIR /usr/src/app

COPY . .

# npm install since we are going to be in development mode
RUN npm install

# npm start is the command to start the application in development mode
# ENV REACT_APP_BACKEND_URL=http://localhost:3001
CMD ["npm", "start"]