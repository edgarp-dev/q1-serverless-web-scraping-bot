import { DynamoDB } from 'aws-sdk';
import KeycapSet from "../models/KeycapSet";
import DbClient from "./DbClient";

export default class KeycapSetRepository {
    private _dbClient: DynamoDB.DocumentClient;

    private _dbTable: string;

    constructor(dbTable: string) {
        this._dbClient = new DbClient().getClient();
        this._dbTable = dbTable;
    }

    public async saveBatch(keycapSetList: KeycapSet[]): Promise<void> {
        const saveItemRequests: Promise<any>[] = keycapSetList.map((keycapSet: KeycapSet) => this.saveItem(keycapSet));
        await Promise.all(saveItemRequests);
    }

    private saveItem(keycapSet: KeycapSet): Promise<any> {
        const params = {
            TableName: this._dbTable,
            Item: {
                ID: keycapSet.id,
                Name: keycapSet.name,
                ImageUrl: keycapSet.imageUrl,
                Price: keycapSet.price,
                ProductUrl: keycapSet.productUrl
            }
        };

        return this._dbClient.put(params).promise();
    }
}