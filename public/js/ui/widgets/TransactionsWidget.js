/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else throw 'Элемент не существует';
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    console.log('TransactionsWidget registerEvents');
    console.log(this);
    const buttonIncome = this.element.querySelector('.btn-success');
    const buttonExpense = this.element.querySelector('.btn-danger');
    buttonIncome.onclick = () => {
      App.getModal('newIncome').open();
    };
    buttonExpense.onclick = () => {
      App.getModal('newExpense').open();
    };
  }
}
