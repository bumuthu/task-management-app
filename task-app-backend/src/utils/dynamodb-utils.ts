import { BatchWriteItemCommand, DeleteItemCommand, DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import ConfigProvider from "../config/config-provider";

const client = new DynamoDBClient({
    region: ConfigProvider.get('AWS_REGION') as string,
    credentials: {
        accessKeyId: ConfigProvider.get('AWS_ACCESS_KEY') as string,
        secretAccessKey: ConfigProvider.get('AWS_SECRET_KEY') as string
    }
});

export const getAll = async (tableName: string) => {
    const params = {
        TableName: tableName
    };
    const command = new ScanCommand(params);
    return client.send(command);
}

export const getItemById = async (tableName: string, id: string) => {
    const params = {
        Key: {
            id: { S: id },
        },
        TableName: tableName
    };
    const command = new GetItemCommand(params);
    return client.send(command);
}

export const createItem = async (tableName: string, item: any) => {
    const params = {
        Item: item,
        TableName: tableName
    };
    const command = new PutItemCommand(params);
    return client.send(command);
}


export const updateItem = async (tableName: string, id: string, update: any) => {
    const params = {
        Key: {
            id: { S: id },
        },
        AttributeUpdates: update,
        TableName: tableName
    };
    const command = new UpdateItemCommand(params);
    return client.send(command);
}

export const deleteItem = async (tableName: string, id: string) => {
    const params = {
        Key: {
            id: { S: id },
        },
        TableName: tableName
    };
    const command = new DeleteItemCommand(params);
    return client.send(command);
}

export const batchWriteItems = async (tableName: string, items: any[]) => {
    const params = {
        RequestItems: {
            [tableName]: items.map(item => ({ PutRequest: { Item: item } }))
        }
    };
    const command = new BatchWriteItemCommand(params);
    return client.send(command);
}