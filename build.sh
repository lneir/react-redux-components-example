#!/bin/sh

# Note: this script expects install-local cmd to be avaiable globally:
# npm install -g install-local
# https://github.com/nicojs/node-install-local

build()
{
  cd $1
  echo "building:"$1
  rm -rf node_modules/sdk
  rm -rf node_modules/chat
  rm -rf node_modules/grid
  rm -rf node_modules/navigation
  install-local
  npm run prepublishOnly
  cd ..
  echo "done building:"$1
  echo "--------------"
}

build sdk
build chat
build grid
build navigation

echo "building app"
cd app
rm -rf node_modules/sdk
rm -rf node_modules/chat
rm -rf node_modules/grid
rm -rf node_modules/navigation
install-local
npm run watch
