# Task Management Application

###### **Current version: v1.0.0**

[![GitHub version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)](https://badge.fury.io/gh/bumuthu%2Ftask-management-app)


## Overview
This project facilitates the management of your tasks. In this project, the following tech stack is used. You can find other package versions in the package.json file.

- NPM: `10.9.0`
- Node: `22.12.0`


## Environment Provisioning

Follow the guideline provided in the README file in [taks-app-deployment.](https://github.com/bumuthu/task-management-app/tree/main/task-app-deployment)


## Run Application

Create .env file in the task-app-backend directory refering to .env.example file.

### Option 1: Running without Docker

You can get started easily by running the following commands from task-app-backend directory. 

        npm install
        npm run build
        npm run start

Then your backend application will start running on `3000` as per the .env file.


### Option 2: Running with Docker

Run the following command from task-app-backend directory and build the docker image.

        docker build -t task-app .

Now you can run the following command to get the container up and running locally on `3000` port. Here point your .env file with --env-file tag. 

        docker run --env-file .env -p 3000:3000 task-app


Enjoy managing your task management app now! 



## Version History

| Version | Release Date | Notes                        |
|---------|--------------|------------------------------|
| 1.0.0   | 2024-12-07   | Initial release              |
