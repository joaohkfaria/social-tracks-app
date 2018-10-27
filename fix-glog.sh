#!/bin/bash
cd node_modules/react-native/scripts ; ./ios-install-third-party.sh ; cd ../../../
cd node_modules/react-native/third-party/glog-0.3.5/ ; ./configure ; cd ../../../../