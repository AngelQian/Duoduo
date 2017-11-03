#!/bin/bash

#Directory where Meteor is installed :
export METEOR_HOME=/usr/local/bin/meteor

# This is the directory where the Meteor repos are:
export CMDCTR_HOME=/home/aqian/duoduoMeteor/duoduo

export CLOUD_CONFIG_DIR=${CMDCTR_HOME}
#export MONGO_URL='mongodb://mongo1-dcdev.compass-calix.com:27017,mongo2-dcdev.compass-calix.com:27017,mongo3-dcdev.compass-calix.com:27017/cloud-dev?replicaSet=mongodb-calix&readPreference=primaryPreferred'
export MONGO_URL=mongodb://localhost:27017/duoduo
 
echo $CLOUD_CONFIG_DIR
echo $MONGO_URL
case $1 in
 start )
 #cd $CMDCTR_HOME/cloud-app-ui
 cd $CMDCTR_HOME
 cp $CMDCTR_HOME/meteor.log $CMDCTR_HOME/meteor.log.old
 nohup $METEOR_HOME > $CMDCTR_HOME/meteor.log 2>&1 &
 echo $! > $CMDCTR_HOME/meteor_pid
 ;;
 debug )
 echo MONGO_URL is $MONGO_URL
 cd $CMDCTR_HOME/cloud-app-ui
 cp $CMDCTR_HOME/meteor.log $CMDCTR_HOME/meteor.log.old
 nohup $METEOR_HOME debug --debug-port 9876 > $CMDCTR_HOME/meteor.log 2>&1 &
 echo $! > $CMDCTR_HOME/meteor_pid
 ;;
 stop )
 ps -ef | grep $(cat $CMDCTR_HOME/meteor_pid) | egrep -vw 'grep|tail|vi|vim' | awk '{print $2}' > $CMDCTR_HOME/meteor_pids
 meteorPid=`cat $CMDCTR_HOME/meteor_pids`
 kill $meteorPid
 rm -f $CMDCTR_HOME/meteor_pid
 rm -f $CMDCTR_HOME/meteor_pids
 ;;
 * )
 echo "wrong paramenter $1"
 echo "use start debug or stop"
 ;;
esac
