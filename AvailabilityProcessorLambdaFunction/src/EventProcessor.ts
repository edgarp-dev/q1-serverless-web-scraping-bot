import {
    DynamoDBStreamEvent,
    DynamoDBRecord,
  } from "aws-lambda";
import AvailableKeycapSetRepository from "./db/AvailableKeycapSetRepository";
import SoldOutKeycapSetRepository from "./db/SoldOutKeycapSetRepository";
import KeycapSet from "./models/KeycapSet";
import NotificationClient from "./notifications/NotificationClient";

type KeyCapDBRecord = {
    ID: {
      S: string
    }
}

export default class EventProcessor {
    private _soldOutKeycapsRepository: SoldOutKeycapSetRepository;

    private _availableKeycapSetRepository: AvailableKeycapSetRepository;

    private _notificationClient: NotificationClient;

    constructor() {
        this._soldOutKeycapsRepository = new SoldOutKeycapSetRepository();
        this._availableKeycapSetRepository = new AvailableKeycapSetRepository();
        this._notificationClient = new NotificationClient();
    }

    public async handleEvent(event: DynamoDBStreamEvent) {
        const insertedRecordsIds = this.getInsertedRecordsIds(event);
        const insertedRecordHandlers = insertedRecordsIds.map((insertedRecordId: string) => this.handleRecordsIds(insertedRecordId));
        await Promise.all(insertedRecordHandlers);
    }

    private getInsertedRecordsIds(event: DynamoDBStreamEvent): string[] {
        const insertEvents: DynamoDBRecord[] = event.Records.filter((record: DynamoDBRecord) => record.eventName === 'INSERT');
        const insertedKeys: KeyCapDBRecord[] = insertEvents.map((insertEvent: DynamoDBRecord) => insertEvent.dynamodb.Keys) as KeyCapDBRecord[];
        const insertedIds: string[] = insertedKeys.map((insertedKey: KeyCapDBRecord) => insertedKey.ID.S);
        return insertedIds;
    }

    private async handleRecordsIds(insertedRecordId: string): Promise<void> {
        const soldOutKeycapSet: KeycapSet | undefined = await this.verifyIfKeycapWasSoldoutBefore(insertedRecordId);
        if (soldOutKeycapSet) {
            await this._notificationClient.sendNotification(soldOutKeycapSet);
            await this.deleteCurrentKeycapSetFromSoldOutDB(soldOutKeycapSet);
            await this.deleteCurrentKeypcaSetFromAvailableDB(soldOutKeycapSet);
        }
    }

    private async verifyIfKeycapWasSoldoutBefore(keycapsetId: string): Promise<KeycapSet | undefined> {
        const keycapSet: KeycapSet = await this.getSoldOutKeyCapSet(keycapsetId);
        if (keycapSet && keycapSet.id) {
            return keycapSet;
        }
        return undefined;
    }

    private async getSoldOutKeyCapSet(keycapsetId: string): Promise<KeycapSet | undefined> {
        const soldOutKeycapsRepository = new SoldOutKeycapSetRepository();
        const keycapInfo = await soldOutKeycapsRepository.getItem(keycapsetId);
        return keycapInfo;
    }

    private async deleteCurrentKeycapSetFromSoldOutDB(keycapSet: KeycapSet): Promise<void> {
        console.log(`DELETING FROM SOLD OUT DB ID ::::: ${keycapSet.id}`);
        await this._soldOutKeycapsRepository.deleteItem(keycapSet.id);
    }

    private async deleteCurrentKeypcaSetFromAvailableDB(keycapSet: KeycapSet): Promise<void> {
        console.log(`DELETING FROM AVAILABLE DB ID ::::: ${keycapSet.id}`);
        await this._availableKeycapSetRepository.deleteItem(keycapSet.id);
    }
}