function toggleText() {
  document.addEventListener('click', function(event) {
    let elem = document.getElementById("text");

    if (event.target.classList.contains("toggle-text-button")) {
      elem.hidden = !elem.hidden;
    }
  });
}
