/**
 * @author dany javier bautista
 */
var contextoGraficos;
var naves = [];
var miOvni = null;
var teclasPres = 0;
// bit 0 1

//contexto refiere al contexto de dibujo de canvas.

var ovniImagen = new Image();
ovniImagen.src = "ovni.png";

//this represents the key released as its ASCII value.

//necesitamos saber si varias teclas estan presionadas a la vez, esa es la funcion de
document.addEventListener("keydown", function(E) {
	if(E.which == 38 && (teclasPres & 1) == 0)
		teclasPres |= 1;
	// Up.
	else if(E.which == 37 && (teclasPres & 2) == 0)
		teclasPres |= 2;
	// Left.
	else if(E.which == 39 && (teclasPres & 4) == 0)
		teclasPres |= 4;
	// Right.
});

document.addEventListener("keyup", function(E) {
	if(E.which == 38)
		teclasPres &= ~1;
	// Up.
	else if(E.which == 37)
		teclasPres &= ~2;
	// Left.
	else if(E.which == 39)
		teclasPres &= ~4;
	// Right.
});

//funcion main

window.addEventListener("load", function() {
	var canvasOvnis = document.getElementById("canvas-ovnis");
	canvasOvnis.width = PG.anchoJuego;
	canvasOvnis.height = PG.altoJuego;
	contextoGraficos = canvasOvnis.getContext("2d");

	// Set up game loop.
	setInterval(function() {
		if(miOvni) {
			if(teclasPres & 2)
				miOvni.OR -= PG.velGiro;
			// Turn left.
			if(teclasPres & 4)
				miOvni.OR += PG.velGiro;
			// Turn right.
			if(teclasPres & 1)// Accelerate.
			{
				miOvni.vx += PG.acceleracion * Math.sin(miOvni.OR);
				miOvni.vy -= PG.acceleracion * Math.cos(miOvni.OR);
				console.log(miOvni.x);
			}
		}

		CorrerJuego(naves);
		DrawGame();
	}, PG.tiempoFrame);
});

//dibujado y entrada en escena de html5

function DrawGame() {
	//limpiar pantalla
	contextoGraficos.clearRect(0, 0, PG.anchoJuego, PG.altoJuego);

	for(var i = 0; i < naves.length; i++) {
		contextoGraficos.save();
		contextoGraficos.translate(naves[i].x | 0, naves[i].y | 0);
		contextoGraficos.rotate(naves[i].OR);
		contextoGraficos.drawImage(ovniImagen, -ovniImagen.width / 2 | 0, -ovniImagen.height / 2 | 0);
		contextoGraficos.restore();
	}
}

naves.push({
	x : 200,
	y : 200,
	vx : 0,
	vy : 0,
	OR : 0
});
naves.push({
	x : 100,
	y : 100,
	vx : 5,
	vy : 0,
	OR : 0
});
naves.push({
	x : 300,
	y : 300,
	vx : -1,
	vy : -1,
	OR : Math.PI
});
miOvni = naves[0]; 