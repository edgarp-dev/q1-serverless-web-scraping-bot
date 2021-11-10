import {
  EventBridgeEvent,
  Handler
} from "aws-lambda";
import KeycapSetParser from './data/KeycapSetParser';
import WebScraper from './data/WebScraper';
import AvailableKeycapSetRepository from "./db/AvailableKeycapSetRepository";
import SoldOutKeycapSetRepository from "./db/SoldOutKeycapSetRepository";

export const lambdaHandler = async (
  event: Handler<EventBridgeEvent<any, any>>
): Promise<void> => {
  try {
    const keycapsUrl: string = 'https://www.keychron.com/collections/q1-k2-oem-dye-sub-pbt-keycap-set';
    const webScrapper = new WebScraper();
    const htmlContent = await webScrapper.getHtmlFrom(keycapsUrl);

    const keycapSetParser = new KeycapSetParser(htmlContent);

    const availableKeycapSetRepository = new AvailableKeycapSetRepository();
    const availableKeycaps = keycapSetParser.getAllAvailableKeycaps();
    await availableKeycapSetRepository.saveBatch(availableKeycaps);

    const soldOutKeycapRepositroy = new SoldOutKeycapSetRepository();
    const soldOutKeycaps = keycapSetParser.getAllSoldOutKeycaps();
    await soldOutKeycapRepositroy.saveBatch(soldOutKeycaps);
  } catch (error) {
    console.log('########## ERROR ##########');
    console.log(error);
    console.log('########## ERROR ##########');
  }
}