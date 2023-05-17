function camelize(str) {
  //с помощью метода map
  //return  arr = str.split('-').map((item, index) => index == 0 ? item : item[0].toUpperCase() + item.slice(1)).join('');

  //с помощью цикла
  let arr = str.split('-');
    
  for (let key in arr) {
    if (key != 0) {
      arr[key] = arr[key][0].toUpperCase() + arr[key].slice(1);
    }
  };

  return str = arr.join('');
}