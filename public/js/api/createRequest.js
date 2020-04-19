/**
 * Основная функция для совершения запросов на сервер.
 * */
const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();

  options.responseType === undefined
    ? (xhr.responseType = 'json')
    : (xhr.responseType = options.responseType);
  xhr.withCredentials = true;

  if (options.method === 'GET') {
    const formData = null;
    const requestUrl = `${options.url}?mail=${options.data.mail}&password=${options.data.password}`;
  }

  if (options.method === 'POST') {
    const formData = new FormData();
    formData.append('mail', options.data.mail);
    formData.append('password', options.data.password);
    const requestUrl = options.url;
  }

  try {
    xhr.open(options.method, requestUrl);

    if (options.headers != undefined) {
      for (var prop in options.headers)
        xhr.setRequestHeader(prop, options.headers[prop]);
    } else {
      xhr.setRequestHeader('Content-type', 'application/json');
    }

    xhr.send(formData);
  } catch (error) {
    callback(error);
  }

  // try {
  //   if (options.method === 'GET') {
  //     xhr.open(
  //       options.method,
  //       `${options.url}?mail=${options.data.mail}&password=${options.data.password}`
  //     );
  //     xhr.send();
  //   }

  //   if (options.method === 'POST') {
  //     const formData = new FormData();
  //     formData.append('mail', options.data.mail);
  //     formData.append('password', options.data.password);
  //     xhr.open(options.method, options.url);
  //     xhr.send(formData);
  //   }
  // } catch (error) {
  //   return (err = error);
  // }

  // function callback(err, response) {
  //   if (err === null) {
  //     // console.log('Статус: ', err);
  //     // console.log('Данные ответа: ', response);
  //     return response;
  //   } else {
  //     // console.log('Ошибка: ', err);
  //     return err;
  //   }
  // }

  if (xhr.status[0] === 2) {
    let err = null;
    response = JSON.parse(xhr.responseText);
    callback(err, response);
  }

  if (xhr.status[0] === 4 || xhr.status === 5) {
    let err = xhr.statusText;
    callback(err);
  }
};
