import './scss/styles.scss';
import { WebLarekApi } from './components/WebLarekAli';
import { Api } from './components/base/api';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { AppState, CardItem } from './components/AppData';
import { Card } from './components/Card';
import { cloneTemplate, ensureElement } from './utils/utils';


// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');


const events = new EventEmitter();
const api = new WebLarekApi(CDN_URL, API_URL);

const appData = new AppState({},events);

const page = new Page(document.body, events);

events.on('items:changed',() => {
    page.catalog = appData.catalog.map(item => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), {
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


api.getCards()
    .then(appData.setCatalog.bind(appData))
    .catch(err => {
        console.error(err);
    });
