const startBtn = document.querySelector(['data-start']);
const stopBtn = document.querySelector(['data-stop']);

startBtn.addEventListener('click', onClickStart);

function onClickStart(e) {
  console.log(e);
}
