import { SQS } from 'aws-sdk';
import KeycapSet from "../models/KeycapSet";
import NotificationAttributesBuilder from "./NotificationAttributesBuilder";
export default class SQSNotificationAttributesBuilder implements NotificationAttributesBuilder<SQS.MessageBodyAttributeMap> {
    private _keycapSet: KeycapSet;

    constructor(keycapSet: KeycapSet) {
        this._keycapSet = keycapSet;
    }

    public getAttributes(): SQS.MessageBodyAttributeMap {
        return {
            'ID': {
                DataType: 'String',
                StringValue: this._keycapSet.id
            },
            'Name': {
                DataType: 'String',
                StringValue: this._keycapSet.name
            },
            'ImageUrl': {
                DataType: 'String',
                StringValue: this._keycapSet.imageUrl
            },
            'Price': {
                DataType: 'String',
                StringValue: this._keycapSet.price
            },
            'ProductUrl': {
                DataType: 'String',
                StringValue: this._keycapSet.productUrl
            }
        }
    }
}