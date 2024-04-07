import './scss/styles.scss';
import { WebLarekApi } from './components/WebLarekAli';
import { Api } from './components/base/api';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { AppState, CardItem } from './components/AppData';
import { Card } from './components/Card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IOrder, IProduct } from './types';
import { CardPopup } from './components/CardPopup';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { BasketPopup } from './components/BasketPopup';
import { DeliveryForm } from './components/DeliveryForm';
import { Contacts } from './components/Contacts';
import { Success } from './components/common/Success';



// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventEmitter();
const api = new WebLarekApi(CDN_URL, API_URL);

const appData = new AppState({},events);

const page = new Page(document.body, events);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate<HTMLTemplateElement>(basketTemplate), events);

const order = new DeliveryForm(cloneTemplate(orderTemplate), events);

const contacts = new Contacts(cloneTemplate(contactsTemplate), events);


events.on('items:changed',() => {
    page.catalog = appData.catalog.map(item => {
        const card = new Card('card',cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            title: item.title,
            image: item.image,
            category: item.category,
            price: item.price
        });
    });
});


events.on('card:select', (item: CardItem) => {
    appData.setPreview(item);
})

// Открытие попапа карточки товара
events.on('preview:changed', (item: CardItem) => {
    const cards = new CardPopup('card',cloneTemplate(cardPreviewTemplate), {
        onClick: () => events.emit('card:buyItem', item)
    });

    modal.render({
        content: cards.render({ 
            title: item.title,
            image: item.image,
            category:item.category,
            description: item.description,
            price: item.price
        })
    });
});

// Нажание на кнопку купить и добавление товара в корзину 
events.on('card:buyItem', (item: CardItem)=> {
    appData.addToOrder(item);
    appData.addToBasket(item);
    page.counter = appData.basket.length;
    modal.close();
})

// Открытые корзины и заполение товарами
events.on('basket:open', () => {
    
    basket.setDisabled(basket.button, appData.order.items.length === 0);

    basket.total = appData.getTotal()

    basket.items = appData.basket.map( (item, counter) => {
        const card = new BasketPopup(cloneTemplate(cardBasketTemplate), {
            onClick: () => events.emit('card:delete', item)
        });
        return card.render({
            index: counter = counter + 1,
            title: item.title,
            cost: item.price
        })
    })

    modal.render ({
        content: basket.render()
    })
})

// Удаление товаров из корзигы
events.on('card:delete', (item: CardItem) => {
    appData.deleteFromOrder(item);
    appData.deleteFromBasket(item); 
    page.counter = appData.basket.length;
    events.emit('basket:open');
})

// 
events.on('order:open', () => {
    modal.render({
        content: order.render({
            address: "",
            valid: false,
            errors: []
        })
    });
});

// Изменение способа оплаты 
events.on('payment:change',(item: HTMLElement) => {
    appData.order.payment = order.paymentSelection;
    console.log(appData.order.payment);
})

events.on('order:submit', () => {
    modal.render({
        content: contacts.render({
            email: "",
            phone: "",
            valid: false,
            errors: []
        })
    });
});


// Изменилось состояние валидации формы
events.on('formErrors:change', (errors: Partial<IOrder>) => {
    const { email, phone, address, payment} = errors;
    contacts.valid = !email && !phone;
    contacts.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
    order.valid = !address && !payment;
    order.errors = Object.values({address, payment}).filter(i => !!i).join('; ');
});

// Изменилось одно из полей
events.on(/^order\..*:change/, (data: { field: keyof IOrder, value: string }) => {
    appData.setDeliveryField(data.field, data.value);
});

// Изменилось одно из полей
events.on(/^contacts\..*:change/, (data: { field: keyof IOrder, value: string }) => {
    appData.setContactsField(data.field, data.value);
});


events.on('contacts:submit', () => {
    appData.order.total = appData.getTotal();

    api.orderResult(appData.order)
    .then(res => {
        const success = new Success(cloneTemplate(successTemplate), {
            onClick: () => {
                appData.clearbasket();
                modal.close()
                page.counter = appData.basket.length;
            }
        })
        modal.render({
            content:success.render({
                total: appData.order.total
            })
        })
    })
    .catch(err => {
        console.error(err);
    });
})


// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
    page.locked = false;
});


api.getCards()
    .then(appData.setCatalog.bind(appData))
    .then(appData.clearbasket)
    .catch(err => {
        console.error(err);
    });
