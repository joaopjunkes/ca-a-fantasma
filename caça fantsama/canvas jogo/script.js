// Obtenha uma referência para o elemento canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Defina as dimensões do tabuleiro
const boardWidth = canvas.width;
const boardHeight = canvas.height;

// Defina a posição inicial do jogador
let playerX = 0;
let playerY = 0;

// Array para armazenar os fantasmas
let ghosts = [];

// Defina o tamanho do jogador e do fantasma
const playerSize = 30;
const ghostSize = 50;

// Variável para controlar a adição de fantasmas a cada 10 segundos
let ghostAddInterval;

// Função para desenhar o tabuleiro
function drawBoard() {
  // Limpe o canvas
  ctx.clearRect(0, 0, boardWidth, boardHeight);

  // Desenhe o jogador
  ctx.fillStyle = "red";
  ctx.fillRect(playerX, playerY, playerSize, playerSize);

  // Desenhe os fantasmas
  ctx.fillStyle = "blue";
  ghosts.forEach((ghost) => {
    ctx.fillRect(ghost.x, ghost.y, ghostSize, ghostSize);
  });

  // Verifique se o jogador foi pego por algum fantasma
  const isPlayerCaught = ghosts.some((ghost) => {
    return (
      playerX < ghost.x + ghostSize &&
      playerX + playerSize > ghost.x &&
      playerY < ghost.y + ghostSize &&
      playerY + playerSize > ghost.y
    );
  });

  if (isPlayerCaught) {
    // O jogador foi pego por um fantasma
    alert("Você foi pego pelo fantasma!");
    resetGame();
  }

  // Chame a função drawBoard repetidamente para atualizar o tabuleiro
  requestAnimationFrame(drawBoard);
}

// Função para lidar com o movimento do jogador
function handleMovement(event) {
  // Obtenha as novas posições do jogador
  let newPlayerX = playerX;
  let newPlayerY = playerY;

  // Verifique a tecla pressionada e atualize as posições do jogador
  switch (event.key) {
    case "ArrowUp":
      newPlayerY -= 10;
      break;
    case "ArrowDown":
      newPlayerY += 10;
      break;
    case "ArrowLeft":
      newPlayerX -= 10;
      break;
    case "ArrowRight":
      newPlayerX += 10;
      break;
  }

  // Verifique se o movimento é válido (não ultrapassa as bordas do tabuleiro)
  if (
    newPlayerX >= 0 &&
    newPlayerX + playerSize <= boardWidth &&
    newPlayerY >= 0 &&
    newPlayerY + playerSize <= boardHeight
  ) {
    playerX = newPlayerX;
    playerY = newPlayerY;
  }
}

// Função para adicionar um novo fantasma
function addGhost() {
  const ghost = {
    x: Math.random() * (boardWidth - ghostSize),
    y: Math.random() * (boardHeight - ghostSize),
    speedX: Math.random() * 4 - 2, // velocidade aleatória entre -2 e 2
    speedY: Math.random() * 4 - 2,
  };

  // Aumentar a velocidade dos fantasmas existentes
  ghosts.forEach((existingGhost) => {
    existingGhost.speedX += 2;
    existingGhost.speedY += 2;
  });

  ghosts.push(ghost);
}

// Função para atualizar a posição dos fantasmas
function updateGhostPosition() {
  ghosts.forEach((ghost) => {
    ghost.x += ghost.speedX;
    ghost.y += ghost.speedY;

    // Verifique se o fantasma atingiu as bordas do tabuleiro
    if (ghost.x < 0 || ghost.x + ghostSize > boardWidth) {
      ghost.speedX *= -1;
    }
    if (ghost.y < 0 || ghost.y + ghostSize > boardHeight) {
      ghost.speedY *= -1;
    }
  });
}

// Função para reiniciar o jogo
function resetGame() {
  playerX = 0;
  playerY = 0;
  ghosts = [];
  clearInterval(ghostAddInterval);
  addGhost();
  ghostAddInterval = setInterval(addGhost, 10000);
}

// Registre o evento de pressionar teclas para controlar o jogador
document.addEventListener("keydown", handleMovement);

// Inicie o jogo chamando a função drawBoard
drawBoard();

// Adicione um fantasma inicial
addGhost();

// A cada 10 segundos, adicione um novo fantasma
ghostAddInterval = setInterval(addGhost, 10000);

// Chame a função updateGhostPosition a cada 50 milissegundos para atualizar a posição dos fantasmas
setInterval(updateGhostPosition, 50);
