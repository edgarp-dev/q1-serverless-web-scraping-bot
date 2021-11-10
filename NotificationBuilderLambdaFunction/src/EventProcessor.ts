import { SQSEvent, SQSRecord } from "aws-lambda";
import Notification from "./models/Notification";
import TelegramBotClient from "./telegram_bot/TelegramBotClient";

export default class EventProcessor {
    private _telegramBotClient: TelegramBotClient;

    constructor() {
        this._telegramBotClient = new TelegramBotClient();
    }
    
    public async handleEvent(sqsEvent: SQSEvent): Promise<void> {
        const sqsEventRecords: SQSRecord[] = sqsEvent.Records;
        const notificationHandlers: Promise<void>[] = sqsEventRecords.map((sqsRecord: SQSRecord) => this.sendNotification(sqsRecord));
        await Promise.all(notificationHandlers);
    }

    private async sendNotification(sqsRecord: SQSRecord): Promise<void> {
        const notification: Notification = this.createNotificationFromRecordAttributes(sqsRecord);
        await this._telegramBotClient.sendNotificationToChannel(notification);
        console.log('########## TELEGRAM NOTIFICATION SENT  ##########');
    }

    private createNotificationFromRecordAttributes(sqsEvent: SQSRecord): Notification {
        const messageAttributes = sqsEvent.messageAttributes;
        const name = messageAttributes.Name.stringValue;
        const imageUrl = messageAttributes.ImageUrl.stringValue;
        const price = messageAttributes.Price.stringValue;
        const productUrl = messageAttributes.ProductUrl.stringValue;
        return new Notification(name, imageUrl, price, productUrl);
    }
}