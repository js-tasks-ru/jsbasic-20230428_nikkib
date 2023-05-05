function factorial(n) {
  if (n === 0) {
    
    return 1;

  } else {
    let result = n;

    for (let i = 1; i <= n-1; i++) {
      result *= n - i;
    }

    return result;
  }
}