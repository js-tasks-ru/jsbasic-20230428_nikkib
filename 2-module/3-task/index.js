let calculator = {
  read(a = 0, b = 0) {
    
    //если одно из переданных значений - не число, считаем его равным 0
    if (Number(a) == 'NaN') {
      a = 0;
    }

    if (Number(b) == 'NaN') {
      b = 0;
    }

    this.a = Number(a);
    this.b = Number(b);
  },
  sum() {
    return this.a + this.b;
  },
  mul() {
    return this.a * this.b;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально