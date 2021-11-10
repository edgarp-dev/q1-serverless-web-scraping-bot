import KeycapSetRepository from "./KeycapSetRepository";
import KeycapSet from "../models/KeycapSet";

export default class SoldOutKeycapSetRepository {
    private _keycapSetRepostory: KeycapSetRepository;

    constructor() {
        this._keycapSetRepostory = new KeycapSetRepository(process.env.SoldOutKeycapsDynamoDBTable);
    }

    public async saveBatch(keycapSetList: KeycapSet[]): Promise<void> {
        await this._keycapSetRepostory.saveBatch(keycapSetList);
    } 
}