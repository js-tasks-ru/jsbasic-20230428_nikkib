function highlight(table) {
  for (let i = 1; i < table.rows.length; i ++) {
    let row = table.rows[i];

    if (row.lastElementChild.hasAttribute('data-available')) {
      let status = row.lastElementChild.getAttribute('data-available');
      
      if (status == 'true') {
        row.classList.add('available');
      } else {
        row.classList.add('unavailable');
      }
    } else {
      row.setAttribute('hidden', 'true');
    }

    if (row.cells[2].textContent == 'm') {
      row.classList.add('male');
    } else if (row.cells[2].textContent == 'f') {
      row.classList.add('female');
    }

    if (row.getElementsByTagName('td')[1].textContent < 18) {
      row.style = "text-decoration: line-through";
    }
  }
}
