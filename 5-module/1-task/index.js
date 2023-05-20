/*Я совсем не поняла это задание - почему в index.html сразу стоит   
  <script>
    hideSelf();
  </script>
  Получается, мы сразу же и вызываем эту функцию?
  
  И тесты не проходили, если пытаться в index.js навесить обработчик события 
    button.addEventListener('click', hideSelf, {once: true}); или
    button.onclick=hideSelf; 
    на кнопку, пришлось его в index.html прописывать
*/

function hideSelf() {
  let button = document.getElementsByClassName('hide-self-button')[0];
  button.hidden = true;
}
