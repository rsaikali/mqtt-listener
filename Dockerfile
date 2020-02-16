###################
# Build environment
FROM node:alpine as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install --silent

COPY . /app

RUN npm run build

########################
# Production environment
FROM nginx:alpine

ENV MQTT_HOST=127.0.0.1
ENV MQTT_PORT=1884

WORKDIR /app

COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/docker-entrypoint.sh /app/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT "/app/docker-entrypoint.sh"
