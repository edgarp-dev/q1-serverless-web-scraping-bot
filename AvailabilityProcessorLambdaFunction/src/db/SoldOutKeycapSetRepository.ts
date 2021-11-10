import { DynamoDB } from 'aws-sdk';
import KeycapSetRepository from "./KeycapSetRepository";
import KeycapSet from "../models/KeycapSet";

export default class SoldOutKeycapSetRepository {
    private _keycapSetRepostory: KeycapSetRepository;

    private static soldOutSetFromDb(data: DynamoDB.DocumentClient.GetItemOutput): KeycapSet {
        const { Item } = data;
        return new KeycapSet(Item.ID, Item.Name, Item.ImageUrl, Item.Price, Item.IsAvailable, Item.ProductUrl);
    }

    constructor() {
        this._keycapSetRepostory = new KeycapSetRepository(process.env.SoldOutKeycapsDynamoDBTable);
    }

    public async getItem(keycapSetId: string): Promise<KeycapSet | undefined> {
        const data = await this._keycapSetRepostory.getItem(keycapSetId);
        if (data && data.Item) {
            return SoldOutKeycapSetRepository.soldOutSetFromDb(data);
        }

        return undefined;
    }

    public async deleteItem(keycapSetId: string): Promise<void> {
        await this._keycapSetRepostory.deleteItem(keycapSetId);
    }
}