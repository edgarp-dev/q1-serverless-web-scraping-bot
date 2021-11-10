import KeycapSetRepository from "./KeycapSetRepository";
import KeycapSet from "../models/KeycapSet";

export default class AvailableKeycapSetRepository {
    private _keycapSetRepostory: KeycapSetRepository;

    constructor() {
        this._keycapSetRepostory = new KeycapSetRepository(process.env.AvailableKeycapsDynamoDBTable);
    }

    public async saveBatch(keycapSetList: KeycapSet[]): Promise<void> {
        await this._keycapSetRepostory.saveBatch(keycapSetList);
    } 
}