/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList - не нужно!!
   * */
  constructor(element) {
    super(element);
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountList = this.element.querySelector('.accounts-select');
    Account.list(User.current(), (err, response) => {
      try {
        response.data.forEach((item) => {
          accountList.insertAdjacentHTML('beforeEnd', `<option value="${item.id}">${item.name}</option>`);
        });
      } catch {
        throw err;
      }
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
        App.modals.newIncome.onClose();
      } else {
        App.modals.newExpense.onClose();
      }
    });
  }
}
