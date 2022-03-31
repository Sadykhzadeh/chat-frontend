FROM mhart/alpine-node:16

RUN mkdir -p /var/www/app
WORKDIR /var/www/app

COPY ./yarn.lock /var/www/app/
COPY ./next.config.js /var/www/app/
COPY ./public /var/www/app/
COPY ./package.json /var/www/app/


# RUN apk --update --no-cache --virtual dev-dependencies add git python make g++
RUN yarn install --frozen-lockfile && yarn cache clean

COPY . /var/www/app
RUN npm run build

# RUN apk del dev-dependencies

EXPOSE 3000
CMD ["npm", "start"]

