/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  #rows = '';

  constructor (rows) {
    this.#rows = rows;
    this.elem = this.#render();
  }
  
  #render() {
    const table = document.createElement('table');  

    table.innerHTML = this.#templateHeader();

    let tbody = document.createElement('tbody');
    
    for (let row of this.#rows) {
      let tr = document.createElement('tr');
      
      for (let key in row) {
        let td = document.createElement('td');
        td.textContent = row[key];
        tr.append(td);
      }
 
      tr.insertAdjacentHTML('beforeend', '<td><button>X</button></td>');
      
      tr.lastElementChild.onclick = () => tr.remove();
      
      tbody.append(tr);
    }

    table.append(tbody);

    return table;
  }

  #templateHeader() { 
    return `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
    `
  }
  
//вариант с геттером, тогде не писать в свойствах класса elem = null
// get elem() { 
//  if (!this.table) {
//    this.table = this.#render();
//  }
//  return this.table;
// }
}