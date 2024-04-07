import { ICard, ICardPopup, } from "../types";
import { Card, ICardActions} from "./Card";
import { ensureElement} from "../utils/utils";


export class CardPopup extends Card<ICardPopup> {
    protected _description: HTMLElement;
    protected _button: HTMLElement;

    constructor(blockName: string, container: HTMLElement, actions? : ICardActions) {
        super(blockName,container,actions);

        this._description = ensureElement<HTMLElement>(`.${blockName}__text`,container);
        this._button = container.querySelector(`.${blockName}__button`);

        if( actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            }
        }
    }

    set description( value: string) {
        this.setText(this._description, value);
    }
}
