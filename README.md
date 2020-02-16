# mqtt-listener

![Docker](https://github.com/rsaikali/mqtt-listener/workflows/Docker/badge.svg)

`mqtt-listener` is a ReactJS application used to display messages published over a MQTT broker over websockets.

<p align="center">
    <img src="https://raw.githubusercontent.com/rsaikali/mqtt-listener/master/screenshot.png" width="600">
</p>

## How to use

`mqtt-listener` can be used as a standalone ReactJS application or as a Docker container.

### Use as a standalone ReactJS application

Git clone the project:

```sh
git clone https://github.com/rsaikali/mqtt-listener.git
cd mqtt-listener
```

You'll then need to fill your MQTT broker host and port.

Edit the file `src/index.js` and replace `MQTT_HOST` and `MQTT_PORT`

```js
ReactDOM.render((
  <MQTTTable
    topic="#"
    mqtt_url="ws://MQTT_HOST:MQTT_PORT" />
  ),
  document.getElementById('root')
);
```

should become (for example):

```js
ReactDOM.render((
  <MQTTTable
    topic="#"
    mqtt_url="ws://mosquitto.local:1884" />
  ),
  document.getElementById('root')
);
```

Then install dependencies:

```sh
npm install
```

And launch with:

```sh
npm start
```

### Use as Docker container

#### Use Docker hub image

An image is available on Docker Hub: [rsaikali/mqtt-listener](https://hub.docker.com/r/rsaikali/mqtt-listener)

Needed environment is described in the Dockerfile:

```sh
docker run --name mqtt-listener \
           --restart=always \
           --net=host \
           -tid \
           -e MQTT_HOST=mosquitto.local \
           -e MQTT_PORT=1884 \
           rsaikali/mqtt-listener
```

#### Build your own Docker image

To build an `linux/arm/v7` docker image from another architecture, you'll need a special (experimental) Docker multi-architecture build functionality detailled here: [Building Multi-Arch Images for Arm and x86 with Docker Desktop](https://www.docker.com/blog/multi-arch-images/)

You'll basically need to activate experimental features and use `buildx`.

```sh
export DOCKER_CLI_EXPERIMENTAL=enabled
docker buildx create --use --name build --node build --driver-opt network=host
docker buildx build --platform linux/amd64,linux/arm/v7 -t <your-repo>/mqtt-listener --push .
```