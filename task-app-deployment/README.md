# Task Management Application

###### **Current version: v1.0.0**

[![GitHub version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)](https://badge.fury.io/gh/bumuthu%2Ftask-management-app/tree/main/task-app-deployment)


## Environment Provisioning

Create an IAM user with CLI access in order to create DynamoDB tables using AWS Management Console. Hereby I attach `AmazonDynamoDBFullAccess` and `AmazonS3FullAccess` in order to grant for all the actions including DynamoDB table create, list, update, read, and S3 file read, write, etc.


Then create Access Keys for the IAM user in AWS Management Console. 

Make sure to export the Aceess Key and Scret Key in the terminal before running the AWS CLI commands.

### AWS DynamoDB Table Creation

Install AWS CLI following these [instructions.](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)

Now, run the following commands to provision DynamoDB tasks & users tables as per the definitions. Then update the ttl for users table.

        aws dynamodb create-table --cli-input-json file://dynamodb-tables/tasks-table-schema.json
        aws dynamodb create-table --cli-input-json file://dynamodb-tables/users-table-schema.json
        aws dynamodb update-time-to-live --table-name UserTable --time-to-live-specification "Enabled=true, AttributeName=ttl"


Now, run this and check whether the tables are created in the account.

        aws dynamodb describe-table --table-name TaskTable
        aws dynamodb describe-table --table-name UserTable


Create S3 Bucket to enable file uploads with presigned URL.

        aws s3api create-bucket --bucket task-files-us-east-2 --region us-east-2 --create-bucket-configuration LocationConstraint=us-east-2

