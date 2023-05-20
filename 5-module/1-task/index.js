/*Я так поняла, что поскольку в index.html функция hideSelf сразу вызывается, без навешивания на какой-либо объект, 
то нужный объект мы определяем уже в процессе выполнения*/

function hideSelf() {
  let target;

  document.addEventListener('click', function(event) {
    target = event.target;

    let button = document.getElementsByClassName('hide-self-button')[0];

    if (target.classList.contains('hide-self-button')) {
      button.hidden = true;
    }
  });
}
