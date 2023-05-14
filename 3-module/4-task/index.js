function showSalary(users, age) {
  let usersFiltered = users
                        .filter(user => (user.age <= age))
                        .map(user => ({name: user.name, balance: user.balance}));

  let strUsersSalary = '';
  for (let i = 0; i < usersFiltered.length; i++) {
    if (i == usersFiltered.length - 1) {
      strUsersSalary = strUsersSalary + usersFiltered[i].name + ', ' + usersFiltered[i].balance;
    } else {
      strUsersSalary = strUsersSalary + usersFiltered[i].name + ', ' + usersFiltered[i].balance + '\n'
    };
  }

  return strUsersSalary;
}