# You can use any Node version you like, see the full list of available versions:
# https://hub.docker.com/_/node
FROM node:12.14.1

WORKDIR /src
ADD package.json .

# Install dependancies with yarn
RUN npm i

# Run the build script
# RUN npm run-script build

#Expose port 3000 where the qapplication will run
EXPOSE 3000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
# Start the application with pm2
# You can also start it with just node
CMD /wait && npm run start:dev
