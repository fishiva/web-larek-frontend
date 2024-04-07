import { Component } from "./base/Components";
import { ICard } from "../types";
import { ensureElement } from "../utils/utils";

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card<T> extends Component<ICard> {
    protected _category: HTMLElement;
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _price: HTMLElement;
    protected _button?: HTMLElement;
    protected _blockName?: string;

    protected _dict = <Record<string,string>>  {
        "софт-скил": "soft",
        "другое": "other",
        "дополнительное":"additional",
        "кнопка":"button",
        "хард-скил":"hard"
    }

    constructor(blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._category = ensureElement<HTMLElement>(`.${blockName}__category`,container);
        this._price = ensureElement<HTMLElement>(`.${blockName}__price`,container);
        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._button = container.querySelector(`.${blockName}__button`);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
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
            this.setDisabled(this._button,true);
            this.setText(this._price, 'Бесценно');
        }
    }
}


