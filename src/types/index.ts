// Интерфейс данных о товаре

export interface IProduct {
    id: string;
    category: string;
    title: string;
    about?: string;
    image: string;
    price: number;
}


// Интерфейс отображения страницы

export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

// Интерфейс отображения корзины

export interface IBasket {
    items: HTMLElement[];
    cost: number;
} 

// Интерфейс отображения формы доставки

export interface IDeliveryForm {
    address: string;
    payment: string;
}

// Интерфейс отображения формы заполнения данных

export interface IContacts {
    email: string;
    phone: string;
}

// Интерфейс отображения подтверждения покупки

export interface IConfirmation {
    cost: number | null;
}


//Все что ниже нужно добавить в документацию

// Интерфейс карточки 
export interface ICard extends IProduct {

}

export interface IWebLarekAPI {
    getCards: () => Promise<ICard[]>;
    getLotItem: (id: string) => Promise<ICard>;
    orderResult: (order: IOrder) => Promise<IOrderResult>;
}

// Получение ответа от сервера, в ответе будет две графы
export interface IOrder extends IContacts, IDeliveryForm {
    item: string[];
    total: number;
}

export interface IOrderResult {
    id: string;
}