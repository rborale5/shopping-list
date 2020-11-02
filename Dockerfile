FROM node:12.15.0-slim
WORKDIR /usr/local/app/shopping-list
COPY package.json /usr/local/app/shopping-list/.
RUN npm install
#RUN apt-get install vim -y
COPY src/ /usr/local/app/shopping-list/bin
COPY config/ /usr/local/app/shopping-list/config
COPY loglevel /
EXPOSE 3000
CMD CONFIG_DIR=/usr/local/app/shopping-list/config node bin/bin/www

