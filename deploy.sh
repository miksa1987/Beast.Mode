#!/bin/bash

rm -rf ../beastmode-deploy/*
cd beast.mode
npm run build
cp -r ./build ../../beastmode-deploy/
cd ../Beast.backend
cp -r ./certs ../../beastmodedeploy/
cp -r ./controllers ../../beastmodedeploy/
cp -r ./models ../../beastmodedeploy/
cp -r ./util ../../beastmodedeploy/
cp ./*.js ../../beastmodedeploy/
cp ./Procfile ../../beastmodedeploy/
cd ../../beastmodedeploy/
git add *
git commit -m "Automation!"
git push heroku master

cd ../Beast.Mode