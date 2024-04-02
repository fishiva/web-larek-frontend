// Интерфейс данных о товаре

interface IProduct {
    id: string;
    category: string;
    title: string;
    about?: string;
    image: string;
    price: number;
}


// Интерфейс отображения страницы

interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

// Интерфейс отображения корзины

interface IBasket {
    items: HTMLElement[];
    cost: number;
} 

// Интерфейс отображения формы доставки

interface IDeliveryForm {
    address: string;
    payment: string;
}

// Интерфейс отображения формы заполнения данных

interface IContacts {
    email: string;
    phone: string;
}

// Интерфейс отображения подтверждения покупки

interface IConfirmation {
    cost: number | null;
}

// Интерфейс 