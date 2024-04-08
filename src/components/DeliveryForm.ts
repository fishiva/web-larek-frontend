import {Form} from "./common/Form";
import {IDeliveryForm} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import {ensureAllElements, ensureElement} from "../utils/utils";

export class DeliveryForm extends Form<IDeliveryForm> {
    protected _buttonOnline: HTMLElement;
    protected _buttonCash: HTMLElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._buttonCash = this.container.elements.namedItem('cash') as HTMLInputElement;
        this._buttonOnline = this.container.elements.namedItem('card') as HTMLInputElement;

        this._buttonCash.addEventListener('click', () => {
            this._buttonCash.classList.add('button_alt-active');
            this._buttonOnline.classList.remove('button_alt-active');
            this.events.emit('payment:change');
        })

        this._buttonOnline.addEventListener('click', () => {
            this._buttonCash.classList.remove('button_alt-active');
            this._buttonOnline.classList.add('button_alt-active');
            this.events.emit('payment:change');
        })
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }

    set payment(value: string){
        if(value === 'online'){
            this._buttonOnline.classList.add('button_alt-active');
            this._buttonCash.classList.remove('button_alt-active');
            
        } else {
            this._buttonOnline.classList.remove('button_alt-active');
            this._buttonCash.classList.add('button_alt-active');
        }
    }

    get paymentSelection () {
        if(this._buttonCash.classList.contains('button_alt-active')){
            return 'cash';
        }
        if(this._buttonOnline.classList.contains('button_alt-active')){
            return 'online';
        }
    }



}