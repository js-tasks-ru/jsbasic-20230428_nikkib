function factorial(n) {
  if (n === 0) {
    
    let result = 1;
    return result;

  } else {
    let result = n;

    for (let i = 1; i <= n-1; i++) {
      result *= n - i;
    }

    return result;
  }
}