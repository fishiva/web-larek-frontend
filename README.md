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
### 1. Класс  EventEmitter

Класс, реализующий паттерн «Наблюдатель», а также позволяющий уведомить всех, кто были подписан на данное событие. Узнав об этом, «подписчики» смогут каким-либо образом отреагировать на событие.

Методы класса:

* on — подписка на событие
* off — отписка от события
* emit — уведомление «подписчиков» о наступлении события
* onAll — подписка на все события
* onOff — отписка от всех событий
* trigger - генерация заданного события с заданными аргументами. Это позволяет передавать его в качестве обработчика события в другие классы. Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса EventEmitter .

### 2. Класс Api

Класс для работы с API. Работа происходить с применением базовых HTTP- методов запросов к серверу: GET, POST, PUT, DELETE.

Методы класса:

* handleResponse — обрабатывает ответы от сервера, переводя их в формат JSON, при неудаче генерирует ошибку.
* get-  выполнение GET запроса на сервер
* post-  выполнение запроса на сервер с возможностью выбора метода(PUT/POST/DELETE)


### 3. Класс Component

Класс для отрисовки пользовательского интерфейса, а также для работы с DOM- элементами в дочерних компонентах.

Методы класса:

* toggleClass — переключение класса компонента
* setText — установка текстового содержания
* setDisabled — смена статуса блокировки 
* setImage — установка для компонента изображения с альтернативным текстом
* render — возврат корневого DOM-элемента

### 4. Класс Model

Класс, создающий модели данных, предназначенных для управления данными приложения.

Методы:

* emitChanges - сообщает всем подписчикам, что модель поменялась

## Компоненты модели данных

### 1. Класс CardItem

Данный класс необходим для хранения данных о товаре. Наследуется от базового класса Model по интерфейсу `Iproduct`

```TypeScript

interface IProduct{
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

```

### 2. AppState

Класс хранения и управления состоянием всего приложения. Наследуется от класса Model по интерфейсу `IAppState`

```TypeScript

export interface IAppState {
    catalog: IProduct[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
    total: string | number;
    loading: boolean;
}

```

Методы:

* getTotal - получение всей суммы покупки
* setCatalog - загрузка в модель каталога товаров
* setPreview - предпросмотр карточки продукта
* addToOrder - добавление товара в наш заказ
* deleteFromOrder - удаление товара из заказа
* clearbasket - очиста корзины от данных
* addToBasket - добавление данных в корзину
* deleteFromBasket - удаление данных из корзины
* validateDelivery - проверка валидации на этапе заполнения адреса
* validateContacts - прооверка валидации на этапе заполнения личных данных
* setDeliveryField - установка поля доставки
* setContactsField - установка поля контактов

### 3. Класс WebLarekApi

Класс для работы с Api сервера WebLarek. Наследуется от базового класса Api по интерфейсу `IWebLarekAPI`

```TypeScript

export interface IWebLarekAPI {
    getCards: () => Promise<ICard[]>;
    getCardItem: (id: string) => Promise<ICard>;
    orderResult: (order: IOrder) => Promise<IOrderResult>;
}

```

## Компоненты представления

### 1. Класс Card

Класс карточки, отвечающий за отображение товара посредством связи с разметкой. Наследуется от базового класса Component по интерфейсу `ICard`

```TypeScript

export interface ICard {
    category: string;
    title: string;
    image: string;
    price: number;
    description: string;
}

```
Поля класса:
* _category - хранит категорию
* _title - хранит заголовок
* _image - хранит изображение
* _price - хранит цену товара
* _button? - условный оператор, хранит кнопку карточки
* _blockName - условный оператор, хранит "имя" блока разметки

### 2. Класс CardPopup

Класс служит для отображения модального окна карточки. Наследуется от класса Card по интерфейсу `ICardPopup`

```TypeScript

export interface ICardPopup {
    about: string;
    button: HTMLButtonElement;
}

```

Методы:
* set description - установка описания товара карточки


### 3. Класс Modal

Класс, отвечающий за отображение модального окна. Наследуется от базового класса Component по интерфейсу `IModalData`

```TypeScript

interface IModalData {
    content: HTMLElement;
}

```
Методы: 

* set content - устанавливает содержимое модального окна
* open - открывает модальное окно
* close - закрывает модальное окно
* render - отрисовывает данные модального окна с поледующим его открытием

### 4. Класс Page

Класс отвечает за отображение элементов на главной странице. Наследуется от Component по интерфейсу `IPage`

```TypeScript

export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

```

Методы:

* set counter - устанавливает счетчик на кол-во товаров в корзине
* set catalog - устанавливает каталог
* set locked - делает невозможным прокрутку страницы во то время, как открыто модальное окно


### 5. Класс Basket

Класс отображения корзины в модальном окне. Наследуется от базового класса Component по интерфейсу `IBasketView`

```TypeScript

interface IBasketView {
    name: string;
    total: number;
    selected: string[];
}

```
Поля:

* _list - хранит разметка спика товаров
* _total - хранит разметка итоговой суммы покупки
* button - хранит разметка кнопки корзины

Методы: 

* set items - добавляет товары в разметку
* set total - устанвливает итоговую сумму покупок

### 6. Класс BasketPopup

Класс служит для отображения данных о товаре в каталоге. Наследуется от базового класса Component по интерфейсу `IBasketPopup`

```TypeScript

export interface IBasketPopup {
    index: number;
    title: string;
    cost: number;
    button: HTMLElement;   
} 

```
Методы:

* set title - устанавливает текст заголовку
* set index - устанавливает индекс товара в корзине
* set price - устанавливает цену товара

### 7. Класс Form

Класс, обеспечивающий возможность работы с формами в разметке и их валидациями. Наследуется от базового класса Component по интерфейсу `IFormState`

```TypeScript

interface IFormState {
    valid: boolean;
    errors: string[];
}

```

Методы:

* set valid - установка валидности поля
* set errors - установка ошибок в поле
* render - отрисовка форм 

### 8. Класс DeliveryForm

Класс, отвечающий за отображение модального окна, в котором происходит выбор способа оплаты, а также адреса. Наследуется от класса Form по интерфейсу `IDeliveryForm`

```TypeScript

interface IDeliveryForm {
    address: string;
    payment: string;
}

```
Методы: 

* set address - установка адреса
* get paymentSelection - получение названия способа отправки товара в нужном формате

### 9. Класс Contacts

Класс, отвечающий за отображение модального окна, в котором будет происходить заполнение личных данных для покупки товара. Наследуется от класса Form по интерфейсу `IContacts`

```TypeScript

export interface IContacts {
    email: string;
    phone: string;
}

```

Методы:

* set phone - установка значения номера телефона в соответствующее поле
* set email - установка значения email в соответствующее поле

### 10. Класс Success

Класс, отвечающий за отображение модального окна, в котором будет выводиться информация об успешном оформлении заказа. Наследуется от  базового класса Component по интерфейсу `ISuccess`

```TypeScript

interface ISuccess {
    total: number;
}

```

## Типы данных

```TypeScript
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

```
