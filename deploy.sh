#!/bin/bash

echo "############### Compiling Q1KeycapWebScraperLambdaFunction and dependencies"
cd ./Q1KeycapWebScraperLambdaFunction
npm run compile
cp ./package.json ./build/
cd ./build
npm install --only=prod
cd ../..

echo "############### Compiling AvailabilityProcessorLambdaFunction and dependencies"
cd ./AvailabilityProcessorLambdaFunction
npm run compile
cp ./package.json ./build/
cd ./build
npm install --only=prod
cd ../..

echo "############### Compiling NotificationBuilderLambdaFunction and dependencies"
cd ./NotificationBuilderLambdaFunction
npm run compile
cp ./package.json ./build/
cd ./build
npm install --only=prod
cd ../..

echo "############### Deploying AWS resources"
sam deploy --config-env dev --no-confirm-changeset

echo "############### Deleting Q1KeycapWebScraperLambdaFunction build directory"
cd ./Q1KeycapWebScraperLambdaFunction
rm -rf ./build
cd ../

echo "############### Deleting AvailabilityProcessorLambdaFunction build directory"
cd ./AvailabilityProcessorLambdaFunction
rm -rf ./build
cd ../

echo "############### Deleting NotificationBuilderLambdaFunction build directory"
cd ./NotificationBuilderLambdaFunction
rm -rf ./build
cd ../
