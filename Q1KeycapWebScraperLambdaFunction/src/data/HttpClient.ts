import { Response } from 'got/dist/source/core';
import got from 'got';

export default class HttpClient {
    public async get(url: string): Promise<Response<string>> {
        return await got(url);
    }
}