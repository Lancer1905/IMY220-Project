FROM node:20
WORKDIR /Files
COPY Files/package*.json ./
RUN npm install
COPY Files ./
EXPOSE 3000
CMD [ "npm", "run", "start" ]