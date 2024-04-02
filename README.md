# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Базовый код
1. Класс  EventEmitter

Класс, реализующий паттерн «Наблюдатель», а также позволяющий уведомить всех, кто были подписан на данное событие. Узнав об этом, «подписчики» смогут каким-либо образом отреагировать на событие.

Методы класса:

* on — подписка на событие
* off — отписка от события
* emit — уведомление «подписчиков» о наступлении события
* onAll — подписка на все события
* onOff — отписка от всех событий
* trigger - генерация заданного события с заданными аргументами. Это позволяет передавать его в качестве обработчика события в другие классы. Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса EventEmitter .

2. Класс Api

Класс для работы с API. Работа происходить с применением базовых HTTP- методов запросов к серверу: GET, POST, PUT, DELETE.

Методы класса:

* handleResponse — обрабатывает ответы от сервера, переводя их в формат JSON, при неудаче генерирует ошибку.
* get-  выполнение GET запроса на сервер
* post-  выполнение запроса на сервер с возможностью выбора метода(PUT/POST/DELETE)


3. Класс Components

Класс для отрисовки пользовательского интерфейса, а также для работы с DOM- элементами в дочерних компонентах.

Методы класса:

* toggleClass — переключение класса компонента
* setText — установка текстового содержания
* setDisabled — смена статуса блокировки 
* setHidden — скрытие компонента
* setVisible — показать компонент
* setImage — установка для компонента изображения с альтернативным текстом
* render — возврат корневого DOM-элемента

4. Класс Model

Класс, создающий модели данных, предназначенных для управления данными приложения.

Методы:

* emitChanges - сообщает всем подписчикам, что модель поменялась

## Компоненты модели данных

1. Класс Product

Данный класс необходим для управления данными товара.

Интерфейс, от которого будет наследоваться класс:

```TypeScript
interface IProduct {
    id: string;
    category: string;
    title: string;
    about?: string;
    image: string;
    price: number;
}
```

2. Класс AddDeleteBasket

Класс для взаимодействия с корзиной. Добавление,удаление товаров в корзину, а также очистка корзины.

Методы:

* addToBasket — добавление товара в корзину
* deleteFromBasket — удаление товара из корзины

3. Класс Validation

Класс для проверки валидации форм.

Методы:
* adressValidation — валидация формы доставки(указания адреса)
* contactsValidation — валидация формы заполнения личных данных


## Компоненты представления

1. Класс Card

Класс карточки товара, который будет наследоваться от  Components.

2. Класс Modal

Класс, отвечающий за отображение модального окна. Наследуется от Components.

3. Класс Page

Класс отвечает за отображение  главной страницы. Наследуется от Components.

Интерфейс класса:

```TypeScript
interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}
```

4. Класс Basket

Класс отображения корзины и всех товаров в ней. Наследуется от Components.

```TypeScript
interface IBasket {
    items: HTMLElement[];
    cost: number;
} 
```

5. Класс DeliveryForm

Класс, отвечающий за отображение модального окна, в котором будет происходить выбор способа оплаты, а также адреса. Наследуется от Components.

Интерфейс:

```TypeScript
interface IDeliveryForm {
    address: string;
    payment: string;
}
```

6. Класс Contacts

Класс, отвечающий за отображение модального окна, в котором будет происходить заполнение личных данных для покупки товара.

Интерфейс:

```TypeScript
interface IContacts {
    email: string;
    phone: string;
}
```

7. Класс Confirmation

Класс, отвечающий за отображение модального окна, в котором будет выводиться информация об успешном оформлении заказа. Наследуется от Components.

Интерфейс:

```TypeScript
interface IConfirmation {
    cost: number | null;
}
```

## Типы данных

```TypeScript
//ответ от сервера

export type ApiListResponse<Type> = {
total: number,
items: Type[]
};

// Методы запроса к серверу 

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';


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

Интерфейс:
interface IConfirmation {
    cost: number | null;
}
```




