/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else throw 'Элемент не найден';
    // this.lastOptions;
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    console.log('TransactionsPage update')
    console.log(this)
    console.log(this.lastOptions);
    // console.log(lastOptions);
    // if (Object.keys(this.lastOptions).length)
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    console.log('TransactionsPage registerEvents')
    console.log(this);
    const removeAcc = this.element.querySelector('.remove-account');
    const removeTrans = Array.from(this.element.querySelectorAll('.transaction__remove'));
    removeAcc.onclick = () => {
      this.removeAccount();
    };
    removeTrans.forEach((elem) => {
      elem.onclick = () => {
        this.removeTransaction(elem.dataset.id);
      };
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    console.log('TransactionsPage removeAccount')
    console.log(this);
    if (Object.keys(this.lastOptions).length) {
      confirm('Вы действительно хотите удалить счёт?');
      Account.remove(this.lastOptions.account_id, () => {
        App.update();
      });
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction(id) {
    console.log('TransactionsPage removeTransaction')
    console.log(this);
    console.log(id);
    confirm('Вы действительно хотите удалить эту транзакцию?');
    Transaction.remove(id, () => {
      App.update();
    });
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    console.log('TransactionsPage render')
    console.log(this);
    console.log(options);
    if (options) {
      this.lastOptions = options;
      Account.get(options.account_id, () => {
        this.renderTitle(response.name);
      });
      Transaction.list(options, () => {
        this.renderTransactions(response);
      });
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    console.log('TransactionsPage clear')
    console.log(this);
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = {};
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    console.log('TransactionsPage renderTitle')
    console.log(this);
    console.log(name);
    const title = this.element.querySelector('.content-title');
    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    console.log('TransactionsPage formatDate')
    console.log(this);
    console.log(date);
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const currentDate = new Date(date);
    const newDate = `${currentDate.toLocaleString('ru', { day: 'numeric' })} ${
      months[currentDate.toLocaleString('ru', { month: 'numeric' })]
    } ${currentDate.toLocaleString('ru', { year: 'numeric' })} г. в ${currentDate.toLocaleString('ru', { hour: 'numeric' })}:${currentDate.toLocaleString(
      'ru',
      { minute: 'numeric' }
    )}`;
    return newDate;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    console.log('TransactionsPage getTransactionHTML')
    console.log(this);
    console.log(item);
    const htmlCode = `
    <div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">Новый будильник</h4>
              <div class="transaction__date">${this.formatDate(item.date)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum}<span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                <i class="fa fa-trash"></i>  
            </button>
        </div>
    </div>`;
    return htmlCode;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    console.log('TransactionsPage renderTransactions')
    console.log(this);
    console.log(data);
    if (data.length) {
      const transactions = document.querySelector('.content');
      data.forEach((elem) => {
        transactions.insertAdjacentHTML('beforeend', this.getTransactionHTML(elem));
      });
    }
  }
}
