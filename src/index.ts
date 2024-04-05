import './scss/styles.scss';
import { WebLarekApi } from './components/WebLarekAli';
import { Api } from './components/base/api';
import { API_URL, CDN_URL } from './utils/constants';



const api = new WebLarekApi(CDN_URL, API_URL);


// Получаем лоты с сервера
