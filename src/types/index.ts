// Интерфейс карточки

export interface ICard {
    category: string;
    title: string;
    image: string;
    price: number;
    description: string;
}

// Интерфейс попапа карточки
export interface ICardPopup {
    about: string;
    button: HTMLButtonElement;
}

// Интерфейс отображения страницы

export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

// Интерфейс отображения корзины

export interface IBasketPopup {
    index: number;
    title: string;
    cost: number;
    button: HTMLElement;   
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

// Интерфейс данных о товаре
export interface IProduct{
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IWebLarekAPI {
    getCards: () => Promise<ICard[]>;
    getCardItem: (id: string) => Promise<ICard>;
    orderResult: (order: IOrder) => Promise<IOrderResult>;
}

// Получение ответа от сервера, в ответе будет две графы
export interface IOrder extends IContacts, IDeliveryForm {
    items: string[];
    total: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;


export interface IOrderResult {
    id: string;
}

export interface IAppState {
    catalog: IProduct[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
    total: string | number;
    loading: boolean;
}