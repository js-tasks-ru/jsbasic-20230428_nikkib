function isEmpty(obj) {
  let count = 0;

  for (let key in obj) {
    count += 1;
  }

  return count == 0 ? true : false;
}
