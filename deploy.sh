#!/bin/bash

rm -rf ../beastmode-git
cp -r ../beastmodedeploy/.git ../beastmode-git
rm -rf ../beastmodedeploy
mkdir ../beastmodedeploy
mkdir ../beastmodedeploy/.git
mv ../beastmode-git/* ../beastmodedeploy/.git/*
cd frontend
npm run build
cp -r ./build ../../beastmodedeploy/
cd ../backend
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