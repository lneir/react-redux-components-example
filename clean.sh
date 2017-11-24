#!/bin/sh

clean()
{
  cd $1
  echo "cleaning:"$1
  rm -rf node_modules 
  echo "done cleaning:"$1
  echo "--------------"
  cd ..
}

clean sdk
clean chat
clean grid
clean navigation
clean app
