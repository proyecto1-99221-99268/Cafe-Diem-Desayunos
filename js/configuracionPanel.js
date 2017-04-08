var desayunoActual=new Object();
var opcionesTotales=[];

function cargar(){
	opcionesTotales[0]=opcionesBebidas;
	opcionesTotales[1]=frutas;
	opcionesTotales[2]=dulces;
	opcionesTotales[3]=panaderiaconfiteria;
	opcionesTotales[4]=taza;
	opcionesTotales[5]=bandeja;
	for (var i = 0; i < opcionesTotales.length; i++) {
		var opcion = opcionesTotales[i];	
		var arreglo=new Array();
		//desayunoActual.arreglo=bebidas;
		for (var j=0;j<opcionesTotales[i].length;j++){
			var elemento=new Object();
			elemento.id=opcion[j].id;
			elemento.seleccionado=false;
			arreglo[j]=elemento;
		}
		desayunoActual[i]=arreglo;
	}
}


function mostrar(){

	cargar();
	var tablas=document.getElementsByTagName("TABLE");
	for (var l=0;l<tablas.length;l++){
		var tablaCategoria=tablas[l];
		tablaCategoria.setAttribute("id",l);
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
					imagen.setAttribute("alt",opciones[k].nombre)
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
	var check=target.firstChild;
	var T=target;
	while(T.tagName!="TABLE"){
		T=T.parentNode;
	}
	var idTabla=T.getAttribute("id");

	while(check.tagName!="INPUT"){
		check=check.nextSibling;
	}
	var tablaElegida=opcionesTotales[idTabla];
	var elemento=tablaElegida[id];
	var categoria=desayunoActual[idTabla];
	if(categoria[id].seleccionado==true){
		document.getElementById("canvas").innerHTML="elemento.imagen";
		categoria[id].seleccionado=false;

	}else{
		document.getElementById("canvas").innerHTML=elemento.imagen;
		categoria[id].seleccionado=true;
	}


	actualizarEstado(check,categoria[id].seleccionado);

}

function actualizarEstado(check,seleccionado){

	if(!seleccionado)
		check.checked=false;
	else
		check.checked=true;
}












