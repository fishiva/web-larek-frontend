import './scss/styles.scss';
import { WebLarekApi } from './components/WebLarekAli';
import { Api } from './components/base/api';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { AppState, CardItem } from './components/AppData';
import { Card } from './components/Card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IProduct } from './types';
import { CardPopup } from './components/CardPopup';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { BasketPopup } from './components/BasketPopup';



// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const events = new EventEmitter();
const api = new WebLarekApi(CDN_URL, API_URL);

const appData = new AppState({},events);

const page = new Page(document.body, events);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate<HTMLTemplateElement>(basketTemplate), events);

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
