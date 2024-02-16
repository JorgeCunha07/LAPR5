#!/bin/bash

cd /home/asist/projeto/backend

git pull

npm run build

buildResult=$?

npm run test

testResult=$?

> messageOfTheDay

echo "****" >> ResultOfDeployment
echo "Pipeline started" >> ResultOfDeployment
echo $(date) >> ResultOfDeployment

echo "Last Deployment Info" >> messageOfTheDay
echo $(date) >> messageOfTheDay

if [[ $buildResult -eq 0]]
then
	echo "Build successful" >> ResultOfDeployment
	echo "Build successful" >> messageOfTheDay
else 
	echo "Build failed" >> ResultOfDeployment
	echo "Build failed" >> messageOfTheDay

fi

if [[ $testResult -eq 0]]
then 
	echo "Tests Passed" >> ResultOfDeployment
	echo "Tests Passed" >> messageOfTheDay
else
	echo "Tests Failed" >> ResultOfDeployment
	echo "Tests Failed" >> messageOfTheDay
fi

if [ $testResult -eq 0 ] && [ $buildResult -eq 0]
then
	echo "We gucci fam" >> ResultOfDeployment
	echo "We gucci fam" >> messageOfTheDay
fi

echo "Deployment Pipeline finished bitch" >> ResultOfDeployment
