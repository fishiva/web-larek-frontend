import { Component } from "./base/Components";
import { ICard } from "../types";
import { ensureElement } from "../utils/utils";

// export interface ICard {
//     id: string;
//     category: string;
//     title: string;
//     image: string;
//     price: number;
// }

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card<T> extends Component<ICard> {
    protected _category: HTMLElement;
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _price: HTMLElement;

    protected _dict = <Record<string,string>>  {
        "софт-скил": "soft",
        "другое": "other",
        "дополнительное":"additional",
        "кнопка":"button",
        "хард-скил":"hard"
    }

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._category = ensureElement<HTMLElement>('.card__category',container)
        this._title = ensureElement<HTMLElement>('.card__title',container);
        this._image = ensureElement<HTMLImageElement>('.card__image',container);
        this._price = ensureElement<HTMLElement>('.card__price',container);

        if(actions?.onClick) {
            container.addEventListener('click', actions.onClick);
        } 
    }

    set category(value:string) {
        this.setText(this._category,value);
        this._category.className = 'card__category card__category_' + this._dict[value];
    }

    set title(value:string) {
        this.setText(this._title,value);
    }

    set image(value:string) {
        this.setImage(this._image,value);
    }

    set price(value:string) {
        if (value) {
            this.setText(this._price,value + ' синапсов');
        }
        else {
            this.setText(this._price, 'Бесценно');
        }
    }
}


