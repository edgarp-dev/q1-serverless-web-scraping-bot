import got from 'got';
import Notification from "../models/Notification";
import SSMClient from './SSMClient';

export default class TelegramBotClient {
    private _ssmClient: SSMClient;

    constructor() {
        this._ssmClient = new SSMClient();
    }
    
    public async sendNotificationToChannel(notification: Notification): Promise<void> {
        const telegramBotToken = await this._ssmClient.getParameter(process.env.TelegramBotTokenSSMParameterName);

        const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

        const message = `Keycaps Available!\n${notification.name}\n${notification.price} USD\n${notification.productUrl}`;
        const requestParams = {
            timeout: 8000,
            searchParams: {
                chat_id: '@Q1KeycapsBotChannel',
                text: message
            }
        }
        await got.get(telegramUrl, requestParams);
    }
}