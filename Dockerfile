###################
# Build environment
FROM node:alpine as builder

WORKDIR /opt

ENV PATH /opt/node_modules/.bin:$PATH

COPY package.json /opt/package.json

RUN npm install --silent

COPY . /opt

RUN npm run build

########################
# Production environment
FROM nginx:alpine

ENV MQTT_HOST=127.0.0.1
ENV MQTT_PORT=1884

WORKDIR /opt

COPY --from=builder /opt/build /usr/share/nginx/html
COPY --from=builder /opt/docker-entrypoint.sh /opt/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/opt/docker-entrypoint.sh"]
