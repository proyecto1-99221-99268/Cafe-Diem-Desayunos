var desayunoActual=new Object();
var opcionesTotales=[];

function cargar(){
	var bebidas=new Array();
	desayunoActual.bebidas=bebidas;
	for (var i = 0; i < opcionesBebidas.length; i++) {
		var elemento=new Object();
		elemento.id=opcionesBebidas[i].id;
		elemento.seleccionado=false;
		desayunoActual.bebidas[i]=elemento;

			
	}
	opcionesTotales[0]=opcionesBebidas;
	opcionesTotales[1]=frutas;
	opcionesTotales[2]=dulces;
	opcionesTotales[3]=panaderiaconfiteria;
	opcionesTotales[4]=taza;
	opcionesTotales[5]=bandeja;
}


function mostrar(){

	cargar();
	var tablas=document.getElementsByTagName("TABLE");
	for (var l=0;l<tablas.length;l++){
		var tablaCategoria=tablas[l];
		var fila;
		var celda;
		var k=0;
		var opciones = opcionesTotales[l];
		var largo=Math.ceil(opciones.length/3);
		for(var i=0; i<largo; i++){
			fila=document.createElement("TR");
			for (var j = 0; j < 3; j++) {
				if(k<opciones.length){
					celda=document.createElement("TD");
					var imagen=document.createElement("IMG");
					imagen.setAttribute("src", opciones[k].imagen);
					imagen.setAttribute("class", "imagen");
					celda.setAttribute("onclick", "pintarCanvas(event)");
					celda.setAttribute("id", opciones[k].id);
					var input=document.createElement("INPUT");
					input.setAttribute("type", "checkbox");
					celda.appendChild(imagen);
					celda.appendChild(input);
					fila.appendChild(celda);
					k++;
				}
			}
			tablaCategoria.appendChild(fila);
		}
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












