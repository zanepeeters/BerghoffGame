let board;
let boardWidth = 400;
let boardHeight = 400;
let context;

let chefWidth = 150;
let chefHeight = 350;
let chefX = boardWidth / 2 - chefWidth / 2;
let chefY = boardHeight * 7 / 8 - chefHeight;
let chefImg;
let movingLeft = false;

let chef = {
    img: null,
    x: chefX,
    y: chefY,
    width: chefWidth,
    height: chefHeight
};

let velocityX = 0;

function resizeCanvas() {
    let container = board.parentElement;
    let newWidth = container.clientWidth;
    let aspectRatio = newWidth / boardWidth;

    board.width = newWidth;
    board.height = boardHeight * aspectRatio;

    chef.width = chefWidth * aspectRatio;
    chef.height = chefHeight * aspectRatio;

    let canvasHeight = newWidth * 0.41;
    board.style.height = canvasHeight + "px";

    drawChef();
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    context.save();

    if (movingLeft) {
        context.translate(chef.x + chef.width / 2, chef.y + chef.height / 2);
        context.scale(-1, 1);
        context.translate(-(chef.x + chef.width / 2), -(chef.y + chef.height / 2));
        context.drawImage(chef.img, chef.x, chef.y, chef.width, chef.height);
    } else {
        context.drawImage(chef.img, chef.x, chef.y, chef.width, chef.height);
    }

    context.restore();

    chef.x += velocityX;
    if (chef.x < 0) {
        chef.x = 0;
    } else if (chef.x + chef.width > board.width) {
        chef.x = board.width - chef.width;
    }

    drawChef();
}

window.onload = function() {
    showPopup();

    board = document.getElementById("kitchen");
    context = board.getContext("2d");

    chefImg = new Image();
    chefImg.src = "./chef.png";
    chefWalkImg = new Image();
    chefWalkImg.src = "./chefwalk.png";
    chef.img = chefImg;
    chefImg.style.filter = "brightness(10%)";
    chefWalkImg.style.filter = "brightness(10%)";

    chefImg.onload = function() {
        drawChef();
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveChef);
    document.addEventListener("keyup", stopChef);
}

function showPopup() {
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    let popup = document.createElement("div");
    popup.classList.add("popup");
    popup.style.backgroundColor = "white";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.padding = "20px";
    popup.style.width = "80%";
    popup.style.maxWidth = "600px";
    popup.style.zIndex = "9999"; // Ensure it appears in front
    document.body.appendChild(popup);

    let header = document.createElement("h1");
    header.textContent = "Welcome to our game";
    popup.appendChild(header);

    let content = document.createElement("p");
    content.textContent = "The goal of our game is for you, the player to finish each level with perfection, you will be scored on materials, and ingredients used. While you use the stove top, you will be asked a number of quiz questions, blocking you from taking your pot of the fire. in order not to fail, you must answer the quiz questions fast enough so you can remove your pot from the fire before the countdown ruins your food.";
    
    popup.appendChild(content);

    let content1 = document.createElement("p");
    content1.textContent = "Don't forget to enjoy yourself!";
    
    popup.appendChild(content1);

    let startButton = document.createElement("button");
    startButton.textContent = "Start now";
    startButton.addEventListener("click", function() {
        document.body.removeChild(overlay);
        document.body.removeChild(popup);
    });
    popup.appendChild(startButton);
}

function moveChef(e) {
    let screenWidth = window.innerWidth;
    let speedMultiplier = screenWidth / boardWidth;

    if (e.code == "ArrowRight" || e.code == "KeyD") {
        velocityX = 3 * speedMultiplier;
        movingLeft = false;
        chef.img = chefWalkImg;
    } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
        velocityX = -3 * speedMultiplier;
        movingLeft = true;
        chef.img = chefWalkImg;
    }
}

function stopChef(e) {
    if (e.code == "ArrowRight" || e.code == "KeyD" || e.code == "ArrowLeft" || e.code == "KeyA") {
        velocityX = 0;
        chef.img = chefImg;
    }
}

function drawChef() {
    context.clearRect(0, 0, board.width, board.height);
    if (movingLeft) {
        context.save();
        context.translate(chef.x + chef.width / 2, chef.y + chef.height / 2);
        context.scale(-1, 1);
        context.translate(-(chef.x + chef.width / 2), -(chef.y + chef.height / 2));
        context.drawImage(chef.img, chef.x, chef.y, chef.width, chef.height);
        context.restore();
    } else {
        context.drawImage(chef.img, chef.x, chef.y, chef.width, chef.height);
    }
}
