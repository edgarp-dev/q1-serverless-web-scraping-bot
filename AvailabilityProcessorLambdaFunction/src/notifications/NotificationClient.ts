import KeycapSet from "../models/KeycapSet";
import SQSClient from "./SQSClient";
import SQSNotificationAttributesBuilder from "./SQSNotificationAttributesBuilder";

export default class NotificationClient {
    private _sqsClient: SQSClient;

    constructor() {
        this._sqsClient = new SQSClient();
    }

    public async sendNotification(keycapSet: KeycapSet): Promise<void> {
        const notificationAttributeBuilder = new SQSNotificationAttributesBuilder(keycapSet);
        const messagebody = `Notification for: ${keycapSet.id}`;
        const messageId = await this._sqsClient.sendMessageToQueue(notificationAttributeBuilder, messagebody);
        console.log(`NOTIFICATION SENT FOR KEYCAP SET ID ::::: ${keycapSet.id}`);
        console.log(`MESSAGE ID ::::: ${messageId}`);
    }
}