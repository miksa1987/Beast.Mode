#!/bin/bash

rm -rf ../../prod/beast.MODE/*
cd beast.mode
npm run build
cp -r ./build ../../../prod/beast.MODE/
cd ../Beast.backend
cp -r ./certs ../../../prod/beast.MODE/
cp -r ./controllers ../../../prod/beast.MODE/
cp -r ./models ../../../prod/beast.MODE/
cp -r ./util ../../../prod/beast.MODE/
cp ./*.js ../../../prod/beast.MODE/
cp ./Procfile ../../../prod/beast.MODE/
cd ../../../prod/beast.MODE
git add *
git commit -m "Automation!"
git push heroku master