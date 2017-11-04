#!/bin/bash

#Directory where Meteor is installed :
export METEOR_HOME=/usr/local/bin/meteor

# This is the directory where the Meteor repos are:
export CMDCTR_HOME=/home/aqian/duoduoMeteor/duoduo
export MONGO_URL=mongodb://localhost:27017/duoduo
echo $MONGO_URL

case $1 in
 start )
 cd $CMDCTR_HOME/
 cp $CMDCTR_HOME/meteor.log $CMDCTR_HOME/meteor.log.old
 nohup $METEOR_HOME > $CMDCTR_HOME/meteor.log 2>&1 &
 echo $! > $CMDCTR_HOME/meteor_pid
 ;;
 stop )
 kill -9 $(lsof -i :3000 -t);
esac
