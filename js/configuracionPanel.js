var desayunoActual=new Object();
/*	"bebidas":[], 
	"comidas":[],
	"dulces":[],
	"frutas":[],
	"bandeja":{}*/




function cargar(){
	var bebidas=new Array();
	desayunoActual.bebidas=bebidas;
	for (var i = 0; i < opcionesBebidas.length; i++) {
		var elemento=new Object();
		elemento.id=opcionesBebidas[i].id;
		elemento.seleccionado=false;
		desayunoActual.bebidas[i]=elemento;

			
	}
}


function mostrar(){

	cargar();
	var tablaBebidas=document.getElementById("bebidas");
	var fila;
	var celda;
	var k=0;
	var largo=Math.ceil(opcionesBebidas.length/3);
	for(var i=0; i<largo; i++){
		fila=document.createElement("TR");
		for (var j = 0; j < 3; j++) {
			if(k<opcionesBebidas.length){
				celda=document.createElement("TD");
				var imagen=document.createElement("IMG");
				imagen.setAttribute("src", opcionesBebidas[k].imagen);
				imagen.setAttribute("class", "imagen");
				celda.setAttribute("onclick", "pintarCanvas(event)");
				celda.setAttribute("id", opcionesBebidas[k].id);
				var input=document.createElement("INPUT");
				input.setAttribute("type", "checkbox");
				celda.appendChild(imagen);
				celda.appendChild(input);
				fila.appendChild(celda);
				k++;
			}
		}
		tablaBebidas.appendChild(fila);
	}

}

function pintarCanvas(event){
	var target=event.target;
	while(target.tagName!="TD"){
		target=target.parentNode;
	}
	var id=target.getAttribute("id");
	var elemento=opcionesBebidas[id];
	var check=target.firstChild;

	while(check.tagName!="INPUT"){
		check=check.nextSibling;
	}

	if(desayunoActual.bebidas[id].seleccionado==true){
		document.getElementById("canvas").innerHTML="elemento.imagen";
		desayunoActual.bebidas[id].seleccionado=false;

	}else{
		document.getElementById("canvas").innerHTML=elemento.imagen;
		desayunoActual.bebidas[id].seleccionado=true;
	}


	actualizarEstado(check,desayunoActual.bebidas[id].seleccionado);

}

function actualizarEstado(check,seleccionado){

	if(!seleccionado)
		check.checked=false;
	else
		check.checked=true;
}












