// TASK-2

const createBtn = document.querySelector("[data-action=create]");
const destroyBtn = document.querySelector("[data-action=destroy]");
const jsAmount = document.querySelector(".js-input");
const boxes = document.querySelector("#boxes");

function createBoxes(amount) {
  amount = Number(jsAmount.value);
  function createOneBox(count) {
    let div = document.createElement("div");
    function get_rand_color() {
      var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
      while (color.length < 6) {
        color = "0" + color;
      }
      return "#" + color;
    }
    div.style.background = get_rand_color();
    div.style.width = `${30 + count * 10}px`;
    div.style.height = `${30 + count * 10}px`;
    return div;
  }

  for (let i = 0; i < amount; i++) {
    let div = createOneBox(i);
    boxes.append(div);
  }
}

function destroyBoxes() {
  boxes.innerHTML = " ";
  jsAmount.value = null;
}
createBtn.addEventListener("click", createBoxes);
destroyBtn.addEventListener("click", destroyBoxes);
