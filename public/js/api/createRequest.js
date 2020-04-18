/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();

  if (options.headers === undefined) {
    for (var prop in options.headers) xhr.setRequestHeader(prop, options.headers[prop]);
  }

  options.responseType === undefined ? (xhr.responseType = 'json') : (xhr.responseType = options.responseType);
  xhr.withCredentials = true;

  if (options.method === 'GET') {
    xhr.open(options.method, `${options.url}?mail=${options.data.mail}&password=${options.data.password}`);
    xhr.send();
  }

  if (options.method === 'POST') {
    formData = new FormData();
    formData.append('mail', options.data.mail);
    formData.append('password', options.data.password);
    xhr.open(options.method, url);
    xhr.send(formData);
  }

  function callback(err, response) {
    if (err === null) {
      console.log('Статус: ', err);
      console.log('Данные ответа: ', response);
      return response;
    } else {
      console.log('Ошибка: ', err);
    }
  }

  if (xhr.status[0] === 2) {
    let err = null;
    let response = JSON.parse(xhr.responseText);
    callback(err, response);
  }

  if (xhr.status[0] === 4 || xhr.status === 5) {
    let err = xhr.status;
    let response = xhr.statusText;
    callback(err, response);
  }
};
