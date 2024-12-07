# Task Management Application

###### **Current version: v1.0.0**

[![GitHub version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)](https://badge.fury.io/gh/bumuthu%2Ftask-management-app/tree/main/task-app-deployment)


## Environment Provisioning

Create an IAM user with CLI access in order to create DynamoDB tables using AWS Management Console. Hereby I attach `AmazonDynamoDBFullAccess` in order to grant for all the actions including table create, list, update, read, etc.


Then create Access Keys for the IAM user in AWS Management Console. 

Make sure to export the Aceess Key and Scret Key in the terminal before running the AWS CLI commands.

### AWS DynamoDB Table Creation

Install AWS CLI following these [instructions.](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)

Now, run the following command to provision DynamoDB tasks table as per the definition.

        aws dynamodb create-table --cli-input-json file:dynamodb-tables/tasks-table-schema.json


Now, run this and check whether the table is created in the account.

        aws dynamodb describe-table --table-name TaskTable
