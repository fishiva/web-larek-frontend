import { Api, ApiListResponse } from "./base/api";
import { ICard, IOrderResult, IOrder, IWebLarekAPI } from "../types/index";

export class WebLarekApi extends Api implements IWebLarekAPI {

    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getCards(): Promise<ICard[]> {
        return this.get('/lot').then((data: ApiListResponse<ICard>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    getLotItem(id: string): Promise<ICard> {
        return this.get(`/lot/${id}`).then(
            (item: ICard) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    orderResult(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }
}