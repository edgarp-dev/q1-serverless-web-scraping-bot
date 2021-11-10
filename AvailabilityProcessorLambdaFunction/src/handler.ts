import { DynamoDBStreamEvent } from "aws-lambda";
import * as AWS from 'aws-sdk';
import EventProcessor from "./EventProcessor";
import KeycapSet from './models/KeycapSet';

export const lambdaHandler = async (
  event: DynamoDBStreamEvent
): Promise<void> => {
  try {
    if (event && event.Records) {
      const eventProcessor = new EventProcessor();
      await eventProcessor.handleEvent(event);
    }
  } catch (error) {
    console.log('########## ERROR ##########');
    console.log(error);
    console.log('########## ERROR ##########');
  }
}