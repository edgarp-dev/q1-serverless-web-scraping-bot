import KeycapSetRepository from "./KeycapSetRepository";

export default class AvailableKeycapSetRepository {
    private _keycapSetRepostory: KeycapSetRepository;

    constructor() {
        this._keycapSetRepostory = new KeycapSetRepository(process.env.AvailableKeycapsDynamoDBTable);
    }

    public async deleteItem(keycapSetId: string): Promise<void> {
        await this._keycapSetRepostory.deleteItem(keycapSetId);
    }
}