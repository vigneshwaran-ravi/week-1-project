document.addEventListener("DOMContentLoaded", function () {
  const game = new BuildTicTac(0, 0);

  game.generateMatric();

  const playAgain = document.querySelector(".play-again");
  playAgain.addEventListener("click", () => {
    game.reset();
  });
});

class BuildTicTac {
  constructor() {
    this.GAME_MATRIX = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.container = document.querySelector(".container");
    this.ticTac = document.createElement("div");
    this.ticTac.className = "tic-tac";
    this.ticTac.className = "flex flex-col";
    this.user = true;
    this.resultElement = document.querySelector(".result");
  }
  generateMatric() {
    for (let i = 0; i < this.GAME_MATRIX.length; i++) {
      const row = document.createElement("div");
      row.className = "row flex flex-row relative";
      for (let j = 0; j < this.GAME_MATRIX.length; j++) {
        const col = document.createElement("div");
        col.className =
          "col flex flex-row w-[100px] h-[100px] bg-red-300 border-[1px] border-[#ccc] flex justify-center items-center cursor-pointer active:border-[#000]";
        col.dataset.row = i;
        // col.textContent = `${i}-${j}`;
        col.dataset.col = j;
        row.appendChild(col);
      }
      this.ticTac.appendChild(row);
    }
    this.container.appendChild(this.ticTac);
    this.addGameFunctionality();
  }
  addGameFunctionality() {
    this.ticTac.addEventListener("click", (event) => {
      if (event.target.matches(".col")) {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;
        if (this.GAME_MATRIX[row][col]) return;
        if (this.user) {
          event.target.textContent = "X";
          this.GAME_MATRIX[row][col] = "X";
        } else {
          event.target.textContent = "O";
          this.GAME_MATRIX[row][col] = "O";
        }
      }

      this.gameLogic(event);
    });
  }
  gameLogic(event) {
    this.user = !this.user;
    console.log(this.GAME_MATRIX);
    let rdx_sum = 0;
    let ldx_sum = 0;
    let rdo_sum = 0;
    let ldo_sum = 0;
    let isTie = 0;
    for (let i = 0; i < this.GAME_MATRIX.length; i++) {
      let rx_sum = 0;
      let cx_sum = 0;
      let ro_sum = 0;
      let co_sum = 0;
      for (let j = 0; j < this.GAME_MATRIX.length; j++) {
        if (this.GAME_MATRIX[i][j]) {
          isTie += 1;
        }
        if (this.GAME_MATRIX[i][j] === "X") {
          rx_sum += 1;
        } else if (this.GAME_MATRIX[i][j] === "O") {
          ro_sum += 1;
        }
        if (this.GAME_MATRIX[j][i] === "X") {
          cx_sum += 1;
        } else if (this.GAME_MATRIX[j][i] === "O") {
          co_sum += 1;
        }
        const lds = i + j;
        if (i === j && this.GAME_MATRIX[i][j] === "X") {
          rdx_sum += 1;
        } else if (i === j && this.GAME_MATRIX[i][j] === "O") {
          rdo_sum += 1;
        }
        if (lds === 2 && this.GAME_MATRIX[i][j] === "X") {
          ldx_sum += 1;
        } else if (lds === 2 && this.GAME_MATRIX[i][j] === "O") {
          ldo_sum += 1;
        }
      }
      if (rx_sum === 3 || cx_sum === 3 || rdx_sum === 3 || ldx_sum === 3) {
        this.result("X");
      } else if (
        ro_sum === 3 ||
        co_sum === 3 ||
        rdo_sum === 3 ||
        ldo_sum === 3
      ) {
        this.result("O");
      }
    }
    if (isTie === 9) {
      this.result(null);
    }
  }
  result(winner) {
    this.ticTac.classList.add("pointer-events-none");
    this.resultElement.classList.remove("hidden");
    this.resultElement.classList.add("flex");
    const text = document.querySelector(".text");
    if (winner) {
      text.textContent = `${winner} won the match`;
    } else {
      text.textContent = `Draw`;
    }
  }
  reset() {
    this.GAME_MATRIX = this.GAME_MATRIX?.map((item) =>
      this.GAME_MATRIX?.map((item) => null)
    );
    this.ticTac.classList.remove("pointer-events-none");
    this.resultElement = document.querySelector(".result");
    this.resultElement.classList.remove("flex");
    this.resultElement.classList.add("hidden");
    console.log(this.GAME_MATRIX, "236789");
    this.ticTac.remove();
    this.generateMatric();
  }
}

// attribue color, weight, l, w, speed, position
// properties (or) methods body, wheel, gear, seat, rear window, engine
