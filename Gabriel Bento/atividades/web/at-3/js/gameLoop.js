var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 423;

document.body.appendChild(canvas);

//Cenário
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};
bgImage.src = "./image/background.jpg";

//Jogador
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function(){
	playerReady = true;
};
playerImage.src = "./image/player.ico";

//NPC
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
	monsterReady = true;
};
monsterImage.src = "./image/monster.ico";

//Configurações do Jogo
var player = {
	speed: 256
};
var monster = {};
var monstersCaught = 0;

var keysDown = {};
addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

var reset = function (){
	
	player.x = canvas.width / 2;
	player.y = canvas.height / 2;
	
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));


}

//Controles do Jogador
var update = function(modifier){
	if(37 in keysDown){
		player.x -= player.speed * modifier; //Esquerda
	}
	if(38 in keysDown){
		player.y -= player.speed * modifier; //Cima
	}
	if(39 in keysDown){
		player.x += player.speed * modifier; //Direita
	}
	if(40 in keysDown){
		player.y += player.speed * modifier; //Baixo
	}
	
	//Colisão
	if(player.x <= (monster.x + 32)
	&& monster.x <= (player.x + 32)
	&& player.y <= (monster.y + 32)
	&& monster.y <= (player.y + 32)){
		++monstersCaught;
		reset();
	}
	
	if (player.x > canvas.width || player.y > canvas.height)  {window.alert("You Lost");
	reset ();  monstersCaught = 0;
}

		if (player.x < -32 || player.y < -32)  {window.alert("You lost");
	reset (); monstersCaught = 0;
}

	if (monstersCaught == 20 ) {window.alert ("You Win!");reset (); monstersCaught = 0;}
};

//Desenhar na Tela
var render = function(){
	if(bgReady){
		ctx.drawImage(bgImage, 0, 0);
	}
	if(playerReady){
		ctx.drawImage(playerImage, player.x, player.y);
	}
	if(monsterReady){
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.font = "22px Verdana";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monstros Capturados: " + monstersCaught, 32, 32);
};

//Loop do Jogo
var main = function(){
	var now = Date.now();
	var delta = now - then;
	
	update(delta / 1000);
	render();
	
	then = now;
};

//Iniciar o Jogo
reset();
var then = Date.now();
setInterval(main, 1);


