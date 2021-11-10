import { CheerioAPI } from 'cheerio';
import KeycapSet from '../models/KeycapSet';

export default class KeycapSetParser {
    private keycapsProductIds: string[] = [
        '6730053550169',
        '6730023239769',
        '6730092380249',
        '6731795890265',
        '6729620783193',
        '6733373472857',
        '6733377241177',
        '6738244108377',
        '6738244698201',
        '6738434523225',
        '6738442747993'
    ];

    private keycapSetHtmlContent: CheerioAPI;

    constructor(htmlContent: CheerioAPI) {
        this.keycapSetHtmlContent = htmlContent;
    }

    public getAllSoldOutKeycaps(): KeycapSet[] {
        const keycapsSet = this.getAll();
        return keycapsSet.filter((keycapsSet: KeycapSet) => keycapsSet.isAvailable === false);
    }

    public getAllAvailableKeycaps(): KeycapSet[] {
        const keycapsSet = this.getAll();
        return keycapsSet.filter((keycapsSet: KeycapSet) => keycapsSet.isAvailable);
    }

    private getAll(): KeycapSet[] {
        return this.keycapsProductIds.map((productId: string) => this.getKeycapSet(productId));;
    }

    private getKeycapSet(productId: string): KeycapSet {
        const keycapSetName: string = this.keycapSetHtmlContent(`div[data-product-id="${productId}"] .grid-product__meta .grid-product__title`).text().trim();
        const keycapSetImage = this.keycapSetHtmlContent(`div[data-product-id="${productId}"] .grid-product__content .grid-product__link .grid-product__image-mask .grid__image-ratio .grid__image-contain`);
        const keycapSetImageUrl: string = `https:${keycapSetImage.attr('data-src')}`.replace('{width}', '360');
        const keycapSetPrice: string = this.keycapSetHtmlContent(`div[data-product-id="${productId}"] .grid-product__meta .grid-product__price`).text().trim();
        const isAvailable: boolean = this.keycapSetHtmlContent(`div[data-product-id="${productId}"] .grid-product__tag`).text().trim() !== 'Sold out';
        const productHref: string = this.keycapSetHtmlContent(`div[data-product-id="${productId}"] .grid-product__content .grid-product__link`).attr('href');
        const productUrl = `https://www.keychron.com${productHref}`;

        return new KeycapSet(productId, keycapSetName, keycapSetImageUrl, keycapSetPrice, isAvailable, productUrl)
    }
}