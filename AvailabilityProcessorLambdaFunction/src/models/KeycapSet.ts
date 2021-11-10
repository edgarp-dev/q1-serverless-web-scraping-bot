export default class KeycapSet {
    private _id: string;
    private _name: string;
    private _imageUrl: string;
    private _price: string;
    private _isAvailable: boolean;

    private _productUrl: string;

    constructor(id: string, name: string, imageUrl: string, price: string, isAvailable: boolean, productUrl: string) {
        this._id = id;
        this._name = name;
        this._imageUrl = imageUrl;
        this._price = price;
        this._isAvailable = isAvailable;
        this._productUrl = productUrl;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get imageUrl(): string {
        return this._imageUrl;
    }

    public get price(): string {
        return this._price;
    }

    public get isAvailable(): boolean {
        return this._isAvailable;
    }
    
    public get productUrl(): string {
        return this._productUrl;
    }
}