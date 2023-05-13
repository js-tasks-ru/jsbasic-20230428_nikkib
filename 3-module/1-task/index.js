function namify(users) {
  // Вариант 1 - методом массива map
  //  return users.map(user => user.name);

  //Вариант 2 - с циклом
  let names = [];
  
  for (let user of users) {
    names.push(user.name); 
  }
  
  return names;
}

