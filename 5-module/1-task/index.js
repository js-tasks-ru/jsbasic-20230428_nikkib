function hideSelf() {

  const button = document.getElementsByClassName('hide-self-button')[0];

  button.addEventListener('click', function(event) {
    button.hidden = true;
  });
}
