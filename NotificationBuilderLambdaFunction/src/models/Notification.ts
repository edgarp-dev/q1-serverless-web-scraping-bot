export default class Notification {
    private _name: string;

    private _imageUrl: string;

    private _price: string;

    private _productUrl: string;

    constructor(name: string, imageUrl: string, price: string, productUrl: string) {
        this._name = name;
        this._imageUrl = imageUrl;
        this._price = price;
        this._productUrl = productUrl;
    }

    get name(): string {
        return this._name;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    get price(): string {
        return this._price;
    }

    get productUrl(): string {
        return this._productUrl;
    }
}