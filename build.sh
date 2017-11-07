#!/bin/sh

build()
{
  cd $1
  echo "building:"$1
  rm -rf node_modules/sdk
  rm -rf node_modules/chat
  rm -rf node_modules/grid
  rm -rf node_modules/navigation
  npm i
  npm run prepublishOnly
  cd ..
  echo "done building:"$1
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
npm i
npm run watch
