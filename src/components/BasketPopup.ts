import { Component } from "./base/Components";
import { IBasketPopup } from "../types";
import { ICardActions } from "./Card";
import { ensureElement } from "../utils/utils";


export class BasketPopup extends Component<IBasketPopup> {
    protected _index: HTMLElement;
    protected _title: HTMLElement;
    protected _cost: HTMLElement;
    protected _button: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);
        this._index = ensureElement<HTMLElement>('.basket__item-index',container);
        this._title =  ensureElement<HTMLElement>('.card__title',container);
        this._cost = ensureElement<HTMLElement>('.card__price',container);
        this._button = container.querySelector('.card__button');

        if( actions?.onClick) {
            this._button.addEventListener('click', actions.onClick);
        }
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set index( value: string) {
        this.setText(this._index, value);
    }

    set cost( value: string) {
        this.setText(this._cost, value)
    }
}
