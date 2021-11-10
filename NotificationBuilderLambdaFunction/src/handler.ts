import { SQSEvent } from "aws-lambda";
import EventProcessor from "./EventProcessor";

export const lambdaHandler = async (
    event: SQSEvent
): Promise<void> => {
    try {
        if (event && event.Records) {
            const eventProcessor: EventProcessor = new EventProcessor();
            await eventProcessor.handleEvent(event);
        }
    } catch (error) {
        console.log('########## ERROR ##########');
        console.log(error);
        console.log('########## ERROR ##########');
    }
}