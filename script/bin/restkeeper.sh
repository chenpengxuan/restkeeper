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

##############launch the service##################
nohup java ${JAVA_OPTS} -cp ${CLASS_PATH} ${MAIN_CLASS} >> ${GCLOGPATH} 2>&1 &

##############check the service####################
ps aux | grep ${MAIN_CLASS} | grep -v grep > /dev/null 2>&1
if [ $? -eq 0 ]; then
    exit 0
else
    exit 1
fi
