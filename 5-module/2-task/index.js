function toggleText() {
  
  const text = document.getElementById("text");
  const button = document.getElementsByTagName('button')[0];

  button.addEventListener('click', function(event) {
    text.hidden = !text.hidden;
  });
}
