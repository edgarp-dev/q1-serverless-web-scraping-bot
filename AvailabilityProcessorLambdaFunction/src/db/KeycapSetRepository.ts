import { DynamoDB } from 'aws-sdk';
import DbClient from "./DbClient";

export default class KeycapSetRepository {
    private _dbClient: DynamoDB.DocumentClient;

    private _dbTable: string;

    constructor(dbTable: string) {
        this._dbClient = new DbClient().getClient();
        this._dbTable = dbTable;
    }

    public async getItem(keycapSetId: string): Promise<DynamoDB.DocumentClient.GetItemOutput> {
        const params = {
            TableName: this._dbTable,
            Key: {
                ID: keycapSetId,
            }
        };
        return this._dbClient.get(params).promise();
    }

    public async deleteItem(keycapSetId: string): Promise<DynamoDB.DocumentClient.DeleteItemOutput> {
        const params = {
            TableName: this._dbTable,
            Key: {
                ID: keycapSetId,
            }
        };
        return this._dbClient.delete(params).promise();
    }
}