import * as AWS from 'aws-sdk';
import NotificationAttributesBuilder from './NotificationAttributesBuilder';

export default class SQSClient {
    private _sqsClient: AWS.SQS;

    private _queueUrl: string;

    constructor() {
        AWS.config.update({ region: process.env.AWS_REGION });
        this._sqsClient = new AWS.SQS({ apiVersion: '2012-11-05' });
        this._queueUrl = process.env.AvailableKeycapSetNotificationsQueue;
    }

    public async sendMessageToQueue(attributesBuilder: NotificationAttributesBuilder<AWS.SQS.MessageBodyAttributeMap>, messageBody: string): Promise<String> {
        const params = {
            MessageBody: messageBody,
            QueueUrl: this._queueUrl,
            MessageAttributes: attributesBuilder.getAttributes()
        };

        const messageResponse: AWS.SQS.SendMessageResult = await this._sqsClient.sendMessage(params).promise();
        return messageResponse.MessageId;
    }
}