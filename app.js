const turnBtn = document.querySelectorAll(".turn-btn");
const btnX = document.querySelector(".btn-x");
const btnO = document.querySelector(".btn-o");

// start-page & start-btn & main

const startPage = document.querySelector(".start-page");
const startBtn = document.querySelector(".start-btn");
const main = document.querySelector("#main");

// dynamic-o
const dynamicTurn = document.querySelector("#dynamic");

//  Score

const scoreX = document.querySelector(".score-x");
const scoreO = document.querySelector(".score-o");
const win = document.querySelector(".winner");

// stop
const stop = document.querySelector("#stop");

// Game elements || Game box

const boxs = document.querySelectorAll(".box");

const winningPattern = [
   [0, 1, 2],
   [0, 3, 6],
   [0, 4, 8],
   [1, 4, 7],
   [2, 5, 8],
   [2, 4, 6],
   [3, 4, 5],
   [6, 7, 8],
];
let countX = 0;
let countO = 0;
let turn = false;

//  ===== choose your turn =====

function choose() {
   btnX.addEventListener("click", () => {
      turn = true;
      start(turn);
   });
   btnO.addEventListener("click", () => {
      turn = true;
      start(turn);
   });
   start(turn);
}
choose();

//  ====== start the game
function start(turn) {
   if (turn) {
      startBtn.addEventListener("click", (e) => {
         startPage.classList.add("hide");
         main.classList.remove("hide");
      });
   }
}

turnBtn.forEach((e) => {
   e.addEventListener("click", (e) => {
      if (e.target.dataset.id === "x") {
         btnX.classList.add("active");
         btnO.classList.remove("active");
      } else {
         btnX.classList.remove("active");
         btnO.classList.add("active");
      }

      initilize(e.target.dataset.id);
   });
});

// ===== game initilization =====

function initilize(e) {
   let TurnX = e == "x" ? true : false;
   dynamicTurn.style.color = "#00adb5";
   boxs.forEach((box) => {
      box.addEventListener("click", () => {
         if (TurnX) {
            box.innerText = "x";
            dynamicTurn.innerText = "x";
            box.style.color = "#00adb5";
            TurnX = false;
         } else {
            box.innerText = "o";
            dynamicTurn.innerText = "o";
            box.style.color = "#eeeeee";
            dynamicTurn.style.color = "#eeeeee";
            TurnX = true;
         }
         box.disabled = true;
         checkWinner();
      });
   });
}

const checkWinner = () => {
   for (let pattern of winningPattern) {
      const val1 = boxs[pattern[0]].innerText;
      const val2 = boxs[pattern[1]].innerText;
      const val3 = boxs[pattern[2]].innerText;

      if (val1 !== "" && val2 !== "" && val3 !== "") {
         if (val1 === val2 && val2 === val3) {
            boxs[pattern[0]].style.border = ".1px solid  #393e46";
            boxs[pattern[1]].style.border = ".1px solid  #393e46";
            boxs[pattern[2]].style.border = ".1px solid  #393e46";
            update(val1);
         }
      }
   }
};

function disableBtn() {
   for (let box of boxs) {
      box.disabled = true;
   }
}

function enableBtn() {
   for (let box of boxs) {
      box.disabled = false;
   }
}

function update(val1) {
   val1 === "x" ? (countX += 1) : (countO += 1);
   scoreX.innerText = countX;
   scoreO.innerText = countO;
   win.innerText = val1;
   disableBtn();
}

// ====== reset the game
stop.addEventListener("click", () => {
   boxs.forEach((box) => {
      box.innerText = "";
      box.style.border = "0.1px solid rgba(238, 238, 238, 0.43)";
   });
   scoreX.innerText = "";
   scoreO.innerText = "";
   win.innerText = "";
   dynamicTurn.innerText = "";
   enableBtn();
});
