/**
 * @author dany javier bautista
 */


var PG={
	anchoJuego:700,//px
	altoJuego: 400,//px
	tiempoFrame:20,//ms
	radioNave:25,//px
	friccion:0.97,//px
	velMax:6,//px/tiempoFrame
	velGiro:0.1,//rad/tiempoFrame
	acceleracion:0.3//px/(tiempoFrame)^2
	
};
//
function CorrerJuego(naves){
	//nave -> {x,y,vx,vy}
	//mover ovnis y recoger impulsos -> [indexovni1, indexovni2,impulsox,impulsoy]
	//aplicar impulsos calculados
	//aplicar velocidad
	var impulsos=[];
	
	for (var i ; i<naves.length;i++){
		
		//mover naves, xy coord del centro de la nave
		naves[i].x+=naves[i].vx;
		naves[i].y+=naves[i].vy;
		
		
		//chequear colisiones con paredes laterales
		if(naves[i].x<=PG.radioNave || naves[i].x>= PG.anchoJuego-PG.radioNave){
			
			//si vamos hacia una pared damos un impulso, 
			//la nave todavia esta cerca al proximo frame y no debemos dar impulso
			if ((naves[i].x<=PG.radioNave && naves[i].vx<=0)
			||(naves[i].x>=PG.anchoJuego-PG.radioNave && naves[i].vx>=0 /*si no ha tomado el impulso*/)){
				 //[indexovni1, indexovni2,impulsox,impulsoy]
				impulsos.push([i,null,2*naves[i].vx,0]);//girar nave
									
			}
			//paredes rigidas
			if(naves[i].x<=PG.radioNave)naves[i].x=PG.radioNave;
			if(naves[i].x>= PG.anchoJuego-PG.radioNave)naves[i].x=PG.anchoJuego-PG.radioNave;
			
			
		}
		
		//lo mismo pero con paredes arriba y abajo
		//chequear colisiones con paredes laterales
		if(naves[i].y<=PG.radioNave || naves[i].x>= PG.altoJuego-PG.radioNave){
			
			//si vamos hacia una pared damos un impulso, 
			//la nave todavia esta cerca al proximo frame y no debemos dar impulso
			if ((naves[i].y<=PG.radioNave && naves[i].vy<=0 )
			||(naves[i].y>=PG.altoJuego-PG.radioNave && naves[i].vy>=0)){
				 //[indexovni1, indexovni2,impulsox,impulsoy]
				impulsos.push([i,null,2*naves[i].vy,0]);//girar nave
									
			}
			//paredes rigidas
			if(naves[i].y<=PG.radioNave)naves[i].y=PG.radioNave;
			if(naves[i].y>= PG.altoJuego-PG.radioNave)naves[i].y=PG.altoJuego-PG.radioNave;
			
			
		}
		
		//impulsos choques dos naves
		//si sus centros estan a una distancia 2*r
		
		for (var j=i+1;j<naves.length;j++){
			
			//distancia  entre centros de naves
			
			var distCua=(naves[i].x-naves[j].x)*(naves[i].x-naves[j].x)+(naves[i].y-naves[j].y)*(naves[i].y-naves[j].y);
			
			
			if(Math.sqrt(distCua)<= 2*PG.radioNave){
				// The impulses from a two dimensional elastic collision.
				// Delta = (r_j - r_i) . (v_i - v_j) / |r_j - r_i|^2.
				//impulso1 = -delta * [dx,dy]
				//impulso2 = delta * [dx,dy]
				var dx= naves[j].x-naves[i].x;
				var dy= naves[j].y-naves[i].x;
											
				var delta = (  dx*(naves[i].vx-naves[j].vx) +
						   	   dy*(naves[i].vy-naves[j].vy) )  / (dx*dx+dy*dy);
			}
			
			
			//si ya estan saliendo de la colision entonce el ppunto es <=0
			
			if(delta<=0)continue;
			impulsos.push([i,j,delta*dx,delta.dy]);
			
			
		}
	}
	
	
	//no mas fisica cada colision incluso paredes resulta en
//un umpulsomqmcambia la velocidad del ovni
//aplicar impulsos

	
	for(var i =0; i<impulsos.length;i++){
	 //[indexovni1, indexovni2,impulsox,impulsoy]
	naves[impulsos[i][0]].vx -= impulsos[1][2];
	naves[impulsos[i][0]].vx -= impulsos[1][3];
	
	
	//si colisiono contra otro ovni
	if (impulsos[i][1] in naves){
	naves[impulsos[i][1]].vx -= impulsos[1][2];
	naves[impulsos[i][1]].vx -= impulsos[1][3];
		
	}
	
}


//rentringir velocidades y aplicar el multiplicador de friccion
for (var i =0; i< naves.length;i++){
	//restringir velocidad maxima
	var vel=Math.sqrt(naves[i].vx*naves[i].vx+naves[i].vy+naves[i].vy);
	if (vel>=PG.velMax){
		
		naves[i].vx *= PG.velMax/vel;
		naves[i].vx *= PG.velMax/vel;
	}
	
	naves[i].vx*=PG.friccion;
	naves[i].vy*=PG.friccion;
	
}
}




//esa es toda la logica
if (typeof exports !=="undefinied"){
	
	exports.PG= PG;
	exports.CorrerJuego= CorrerJuego;
}
