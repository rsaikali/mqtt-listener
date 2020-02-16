#!/bin/sh

sed -i "s/MQTT_HOST/$MQTT_HOST/g" /usr/share/nginx/html/static/js/*
sed -i "s/MQTT_PORT/$MQTT_PORT/g" /usr/share/nginx/html/static/js/*

nginx -g "daemon off;"
