/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    console.log('User setCurrent');
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    console.log('User current');
    if (localStorage.getItem('user')) {
      console.log(JSON.parse(localStorage.getItem('user')));
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    console.log('User unsetCurrent');
    localStorage.removeItem('user');
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = (f) => f) {
    console.log('User fetch');
    console.log(data);
    createRequest({
      url: this.host + this.url + '/current',
      data,
      responseType: 'json',
      method: 'GET',
      callback: (err, response) => {
        console.log('response after User fetch. reload page')
        console.log(response);
        console.log(response.success);
        if (response.success) {
          const user = { id: response.user.id, name: response.user.name };
          User.setCurrent(user);
        } else {
          User.unsetCurrent();
          err = response.error;
          alert(err);
        }
        callback(err, response);
      },
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = (f) => f) {
    console.log('User register');
    console.log(data);
    let response = createRequest({
      url: this.host + this.url + '/register',
      data,
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response.success) {
          User.setCurrent({ id: response.user.id, name: response.user.name });
        } else {
          return response.error;
        }
        callback(err, response);
      },
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = (f) => f) {
    console.log('User login');
    console.log(data);
    let response = createRequest({
      url: this.host + this.url + '/login',
      data,
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response.success) {
          User.setCurrent({ id: response.user.id, name: response.user.name });
        } else {
          return response.error;
        }
        callback(err, response);
      },
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = (f) => f) {
    console.log('User login');
    console.log(data);
    let response = createRequest({
      url: this.host + this.url + '/logout',
      data,
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response.success) {
          User.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }
}

User.host = Entity.host;
User.url = '/user';
