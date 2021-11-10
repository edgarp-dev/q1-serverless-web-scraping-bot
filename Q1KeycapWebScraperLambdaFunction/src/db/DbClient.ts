import * as AWS from 'aws-sdk';

export default class DbClient {
    private _dynamoDbDocumentClient: AWS.DynamoDB.DocumentClient;
    constructor() {
        AWS.config.update({
            region: process.env.AWS_REGION
        });

        this._dynamoDbDocumentClient = new AWS.DynamoDB.DocumentClient();
    }

    getClient(): AWS.DynamoDB.DocumentClient {
        return this._dynamoDbDocumentClient;
    }
}