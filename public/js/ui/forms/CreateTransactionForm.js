/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountList = this.element.querySelector('.accounts-select');
    Account.list({}, (err, response) => {
      const fullAccountsList = [];
      response.data.forEach((item) => {
        fullAccountsList.push(`<option value="${item.id}">${item.name}</option>`);
      });
      accountList.innerHTML = fullAccountsList.join('');
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options, () => {
      App.update();
      this.element.reset();
      if (this.element.id.includes('income')) {
        App.modals.newIncome.close();
      } else {
        App.modals.newExpense.close();
      }
    });
  }
}
