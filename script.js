let game = document.querySelector(".game");
let boxes = document.querySelectorAll(".box");
let restartBtn = document.querySelector("#restart");
let popUp = document.querySelector(".popup");
let newGame = document.querySelector("#newGame");
let msg = document.querySelector("#msg");

let playerTurn = 1;
let totalClick = 0;
let gameArr = new Array(9).fill(0);
const winArr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        let idx = [...boxes].indexOf(box);
        if(gameArr[idx] == 0){
            if(playerTurn == 1){
                box.innerText = "X";
                playerTurn = 2;
                gameArr[idx] = 1;
            }
            else{
                box.innerText = "O";
                playerTurn = 1;
                gameArr[idx] = 2;
            }
            totalClick++;
            checkWinner();
        }
    });
});

const checkWinner = () => {
    let draw = true;
    for(let [x,y,z] of winArr){
        if(gameArr[x] == gameArr[y] && gameArr[y] == gameArr[z]){
            if(gameArr[x] == 1){
                draw = false;
                showWinner("PLAYER-X");
            }
            else if(gameArr[x] == 2){
                draw = false;
                showWinner("PLAYER-O");
            }
        }
    }
    if(draw == true && totalClick == 9){
        showDraw();
    }
}

function showWinner(playerName){
    boxes.forEach((box) => {
        box.disabled = true;
    });
    restartBtn.disabled = true;
    msg.innerText = `WINNER IS ${playerName} !`;
    setTimeout(() => {
        game.classList.add("hide");
        popUp.classList.add("openPopup");
    }, 1200);
}

function showDraw(){
    boxes.forEach((box) => {
        box.disabled = true;
    });
    restartBtn.disabled = true;
    msg.innerText = "DRAW !!";
    setTimeout(() => {
        game.classList.add("hide");
        popUp.classList.add("openPopup");
    }, 1200);
}

newGame.addEventListener("click",() => {
    popUp.classList.remove("openPopup");
    startNewGame();
});

restartBtn.addEventListener("click",() => {
    startNewGame();
});

function startNewGame(){
    game.classList.remove("hide");
    restartBtn.disabled = false;
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    for(let i=0;i<gameArr.length;i++){
        gameArr[i] = 0;
    }
    playerTurn = 1;
    totalClick = 0;
}