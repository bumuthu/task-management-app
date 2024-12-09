# Task Management Application

###### **Current version: v1.0.0**

[![GitHub version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)](https://badge.fury.io/gh/bumuthu%2Ftask-management-app)


## Overview
This project provides you an API to manage your tasks. This API has been depoyed on AWS ECR. Please contact [me](https://github.com/bumuthu) to get access the hosted API. 


## Run Application

Follow the guideline provided in the README file in [task-app-backend.](https://github.com/bumuthu/task-management-app/tree/main/task-app-backend)


## Usage

Go to `http://<ip_address>:3000/docs` for the api documentation. Use the provided ip address here to derive the host URL.

![Swagger spec](/task-app-backend/images/image-doc.png)

Make sure to change host url with ip address and port before executing the API.

![Health check](/task-app-backend/images/image-health.png)


Browse to [task-app-deployment.](https://github.com/bumuthu/task-management-app/tree/main/task-app-deployment) in order to deploy Docker container to AWS ECR.


## Deployment

`main` branch is configured for a GitHub action to build and run unit tests in the pipeline. Visit [this example job](https://github.com/bumuthu/task-management-app/actions/runs/12232127587/job/34116556624)

`release` branch is configured for a GitHub action to build Docker image and push the image to AWS ECR with `latest` tag. Visit [this example job](https://github.com/bumuthu/task-management-app/actions/runs/12232132069/job/34116569456)

For the following stepes, you can follow the guideline provided in the README file in [task-app-deployment.](https://github.com/bumuthu/task-management-app/tree/main/task-app-deployment)



## Version History

| Version | Release Date | Notes                        |
|---------|--------------|------------------------------|
| 1.0.0   | 2024-12-07   | Initial release              |
