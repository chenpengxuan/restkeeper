#!/bin/bash

source "/etc/profile"
GCLOGPATH="logs/gc.log"
MAIN_CLASS="com.ymatou.restkeeper.Application"
CLASS_PATH="lib/*:conf"
JAVA_OPTS="-Xms1024M -Xmx1024M -Xmn380M \
    -XX:+UseConcMarkSweepGC -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=75 \
    -XX:+PrintGCDetails -XX:+PrintGCDateStamps -verbose:gc -XX:+DisableExplicitGC"

if [ ! -d "logs" ]; then
    mkdir logs
fi

case $1 in
start)
    nohup java ${JAVA_OPTS} -cp ${CLASS_PATH} ${MAIN_CLASS} $2 >> ${GCLOGPATH} 2>&1 &
    ;;
stop)
    ps aux | grep ${MAIN_CLASS} | grep -v grep | awk '{print $2}' | xargs kill -9
    ;;
*)
    echo "Usage: $0 start env|stop" >&2
esac