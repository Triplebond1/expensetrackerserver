FROM node:22-slim 

WORKDIR /documents/triplebond/utilities

COPY package*.json /documents/triplebond/utilities

RUN npm install

COPY . .

# Add wait-for-it script
COPY wait-for-it.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh

ENV PORT = 8080

EXPOSE 8080

CMD ["wait-for-it.sh", "expenseserver-db:5432", "--", "npm", "start"]