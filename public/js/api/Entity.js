/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback = (f) => f) {
    console.log('Entity list');
    console.log(this);
    console.log(data);
    createRequest({
      url: this.host + this.url,
      data,
      responseType: 'json',
      method: 'GET',
      callback,
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = (f) => f) {
    console.log('Entity create');
    console.log(this);
    console.log(data);
    let response = createRequest({
      url: this.host + this.url,
      data: Object.assign({ _method: 'PUT' }, data),
      responseType: 'json',
      method: 'POST',
      callback,
    });
  }
  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = '', data, callback = (f) => f) {
    data.id = id;
    console.log('Entity get');
    console.log(this);
    console.log(data);
    let response = createRequest({
      url: this.host + this.url + '/' + id,
      data,
      responseType: 'json',
      method: 'GET',
      callback,
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = '', data, callback = (f) => f) {
    data.id = id;
    console.log('Entity remove');
    console.log(this);
    console.log(data);
    let response = createRequest({
      url: this.host + this.url,
      data: Object.assign({ _method: 'DELETE' }, data),
      responseType: 'json',
      method: 'POST',
      callback,
    });
  }
}

Entity.url = '';
Entity.host = 'http://localhost:8000';
