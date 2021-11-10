
import { CheerioAPI } from 'cheerio';
import { Response } from 'got/dist/source/core';
import * as cheerio from 'cheerio';
import HttpClient from './HttpClient';

export default class WebScraper {
    private _httpClient: HttpClient;

    constructor() {
        this._httpClient = new HttpClient();
    }

    public async getHtmlFrom(url: string): Promise<CheerioAPI> {
        const rawHtmlContent = await this._httpClient.get(url)
        return this.loadHtmlContent(rawHtmlContent);
    }

    private loadHtmlContent(rawHtmlContent: Response<string>): CheerioAPI {
        return cheerio.load(rawHtmlContent.body);
    }
}