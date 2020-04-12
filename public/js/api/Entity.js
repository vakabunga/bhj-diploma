/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {
  constructor() {
    this.url = '';
    this.host = 'http://localhost:8000';
  }

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback = (f) => f) {
    createRequest({ url: `${this.host}${this.url}`, data, responseType: 'json', method: 'GET', callback });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = (f) => f) {
    data._method = 'PUT';
    createRequest({ url: `${this.host}${this.url}`, data, responseType: 'json', method: 'POST', callback });
  }
  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = '', data, callback = (f) => f) {
    data.id = id;
    createRequest({ url: `${this.host}${this.url}`, data, responseType: 'json', method: 'GET', callback });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = '', data, callback = (f) => f) {
    data.id = id;
    data._method = 'DELETE';
    createRequest({ url: `${this.host}${this.url}`, data, responseType: 'json', method: 'POST', callback });
  }
}
