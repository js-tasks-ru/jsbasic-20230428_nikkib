function sumSalary(salaries) {
  total = 0;

  for (let key in salaries) {
    if (Number.isFinite(salaries[key])) {
      total += salaries[key];
    }
  };

  return total;
}
