let noofbombs = 3;
let customRowColumn = 3;
let calcPoints = 0;
let goal;

changeRowColumn = (a) => {
  customRowColumn = a;
  runGame();
}

function mineBlocks() {
  let arr = [];
  for (i = 0; i < customRowColumn; i++) {
    let arrBlock = [];
    for (j = 0; j < customRowColumn; j++) {
      arrBlock.push({ type: "bell", reveal: false });
    }
    arr.push(arrBlock);
  }
  console.log("dsd", arr);
  return arr;
}

let threebomb = mineBlocks();

placeBomb = () => {
  noofbombs = 0 ? 3 : noofbombs;
}



function injectBomb(bombnum) {
  for (i = 0; i < bombnum; i++) {
    a = Math.abs(Math.round(Math.random() * customRowColumn-1));
    b = Math.abs(Math.round(Math.random() * customRowColumn-1));
    console.log(a,b)
    threebomb[a][b].type = "bomb";
  }
}


function insertImageBlocks() {
  for (i = 0; i < customRowColumn; i++) {
    for (j = 0; j < customRowColumn; j++) {
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
      calcPoints++;
      if(calcPoints === goal) {
        setTimeout(function() {
          alert("You win");
          runGame();
        }, 200);
      }

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
  calcPoints = 0;
  let mainIdBlock = document.getElementById("main");
  mainIdBlock.innerHTML = "";
  mainIdBlock.style['grid-template-columns'] = `repeat(${customRowColumn}, 1fr)`;
  
  threebomb = mineBlocks();
  let newbombadded = document.getElementById('noOfBombs').value;
  if (newbombadded !== ""){
    noofbombs = parseInt(newbombadded)
  } else {
    noofbombs = 3
  }
  goal = (customRowColumn * customRowColumn) - noofbombs;
  document.getElementById('noOfBombs').value="";
  injectBomb(noofbombs);
  insertImageBlocks();
}

runGame();
