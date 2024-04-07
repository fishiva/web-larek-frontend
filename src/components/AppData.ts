import {Model} from "./base/Model";
import {FormErrors, IAppState,  ICard, IOrder, IProduct} from "../types";

// export type CatalogChangeEvent = {
//     catalog: LotItem[]
// };

export class CardItem extends Model<IProduct> {
    description: string;
    category: string;
    id: string;
    image: string;
    title: string;
    price: number;
    counter: number;
}


export class AppState extends Model<IAppState> {
    basket: CardItem[] = [];
    catalog: CardItem[];
    loading: boolean;
    order: IOrder = {
        email: '',
        phone: '',
        items: [],
        total: 0,
        address: "",
        payment: ""
    };
    preview: string | null;
    formErrors: FormErrors = {};

    getTotal() {
        return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0)
    }

    setCatalog(items: IProduct[]) {
        this.catalog = items.map(item => new CardItem(item, this.events));
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    setPreview(item: CardItem) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }


    getClosedLots(): string[] {
        return this.order.items;
    }

    addToOrder(value: CardItem) {
        this.order.items.push(value.id);
    }

    deleteFromOrder(value: CardItem) {
        let a = this.order.items.indexOf(value.id)
        if ( a != -1) {
            this.order.items.splice(a,1);
        }
    }

    clearbasket() {
        this.basket.splice(0, this.basket.length);
        this.order.items.splice(0,this.order.items.length);
    }

    addToBasket(value: CardItem) {
        this.basket.push(value);
    }

    deleteFromBasket(value: CardItem) {
        let a = this.basket.indexOf(value)
        if ( a != -1) {
            this.basket.splice(a,1);
        }
    }


    
    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}

