function mineBlocks() {
  let arr = [];
  for (i = 0; i < 5; i++) {
    let arrBlock = [];
    for (j = 0; j < 5; j++) {
      arrBlock.push({ type: "bell", reveal: false });
    }
    arr.push(arrBlock);
  }
  return arr;
}

let threebomb = mineBlocks();

function injectBomb(bombnum) {
  for (i = 0; i < bombnum; i++) {
    a = Math.round(Math.random() * 4);
    b = Math.round(Math.random() * 4);
    threebomb[a][b].type = "bomb";
  }
}


function insertImageBlocks() {
  for (i = 0; i < 5; i++) {
    for (j = 0; j < 5; j++) {
      let imageDivBlocks = document.createElement("div");
      let squareImage = document.createElement("Img");
      squareImage.setAttribute("src", "grey-image.png");
      imageDivBlocks.appendChild(squareImage);
      let imageBlocks = document.getElementById("main");
      imageDivBlocks.className = "mineblocks";
      imageDivBlocks.dataset.columns = j;
      imageDivBlocks.dataset.row = i;
      // imageDivBlocks.dataset.type = threebomb[i][j].type;
      imageDivBlocks.dataset.reveal = threebomb[i][j].reveal;
      imageDivBlocks.onclick = clickedDiv;
      imageBlocks.appendChild(imageDivBlocks);
    }
  }
}

function clickedDiv() {
  if (this.dataset.reveal) {
    let rowi = parseInt(this.dataset.row);
    let rowj = parseInt(this.dataset.columns);
    if (threebomb[rowi][rowj].type == "bell") {
      this.dataset.reveal = true;
      this.firstChild.src = "diamond.png";
    } else {
      this.firstChild.src = "bomb.png";
      setTimeout(function() {
        alert("game over");
        runGame();
      }, 200);
    }
  }
}

function runGame() {
  document.getElementById("main").innerHTML = "";
  threebomb = mineBlocks();
  injectBomb(3);
  insertImageBlocks();
}

runGame();
