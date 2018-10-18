#!/bin/bash
export NODE_ENV="production"
forever start -w --watchDirectory /opt/chatbot/rainy --minUptime 1000 --spinSleepTime 1000 -l /opt/chatbot/rainy/logs/rainy.log /opt/chatbot/rainy/forever/production.json
