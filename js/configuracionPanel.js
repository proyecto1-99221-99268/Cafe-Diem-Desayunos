var desayunoPersonalizado=[];
var desayunos   = [];
// =new Object();
var capas = [];
var opcionesTotales=[];
var escenario;
var desayunoElegido=[]; //para clasico, especial y matero
var opcionesElegido=[];

function KineticCanvas(n){
	 	escenario = new Kinetic.Stage({
        container: 'miCanvas',
  		width: n,
        height: 500,

    });
}
	

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
		//desayunoPersonalizado.arreglo=bebidas;
		for (var j=0;j<opcion.length;j++){
			//var elemento=new Object();
			//elemento.id=opcion[j].id; //voy construyendo los elems para la lista de selección
			//elemento.seleccionado=false;
			arreglo[j]=false;
		}
		desayunoPersonalizado[i]=arreglo;
	}

	desayunos["personalizado"]=desayunoPersonalizado;
//	cargarEspecificos();

}


function mostrar(){
	cargar();

	var n = document.getElementById("miCanvas").offsetWidth;
  	KineticCanvas(n);
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
					var imagen, input;
					celda=document.createElement("TD");
					imagen=document.createElement("IMG");
					imagen.setAttribute("src", opciones[k].imagen);
					imagen.setAttribute("class", "imagen");
					imagen.setAttribute("alt",opciones[k].nombre);
					//celda.setAttribute("class","ui-widget-content");
					celda.setAttribute("onclick", "pintarCanvas(event)");
					celda.setAttribute("id", opciones[k].id);
					input=document.createElement("INPUT");
					if(opcionesTotales[l]!=taza && opcionesTotales[l]!=bandeja){
						input.setAttribute("type", "checkbox");
					}else{
						input.setAttribute("type", "radio");
						input.setAttribute("name", opciones.nombre);
					}
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
	var categoria=desayunoPersonalizado[idTabla];
	if(categoria[id]==true){
		//document.getElementById("miCanvas").innerHTML="elemento.imagen";
		categoria[id]=false;
		quitarDibujo(elemento.nombre);

	}else{
		//document.getElementById("miCanvas").innerHTML=elemento.imagen;
		setearDibujo(elemento.imagen,elemento.nombre);
		categoria[id]=true;

		if(idTabla==4 || idTabla==5){
			for(var i=0; i<tablaElegida.length; i++){
				if(i!=id && categoria[i]==true){
					categoria[i]=false;
					quitarDibujo(tablaElegida[i].nombre);
				}
			}
		}
	}
	actualizarEstado(check,categoria[id]);

}


function actualizarEstado(check,seleccionado){
	if(!seleccionado)
		check.checked=false;
	else
		check.checked=true;
	calcularPrecio();
}



function setearDibujo(source,nombre){
	var nuevaCapa = new Kinetic.Layer({id:nombre});
	//capas[nombre]=nuevaCapa;
	var imagen = new Image();
    imagen.src = source;
 	var imgFondo = new Kinetic.Image({
        image: imagen,
        draggable: true,
        x: 0,
        y: 0,
        width: 75,
        height: 100
    });
 	nuevaCapa.add(imgFondo);
    escenario.add(nuevaCapa);
    escenario.draw();
}

function quitarDibujo(nombre){
	var layers = escenario.getLayers();
	var capa;
	var i=0;
	var corta=false;
	while (i<layers.length && !corta){
		if (layers[i].attrs.id==nombre)
			{capa = layers[i];
			corta=true;}
		i++;
	}

	capa.removeChildren();
	capa.remove();
	escenario.draw();

}


function calcularPrecio(){
	var precio = 0;
	for (var i=0 ; i<desayunoPersonalizado.length;i++){
		var op = desayunoPersonalizado[i];
		for (var j = 0; j <op.length; j++) {
			if (op[j]){
				var categoria= opcionesTotales[i];
				precio+=categoria[j].precioPorUnidad;
			}
		}
	}
	$("#precio").text("$"+precio);
}


function cargarEspecifico(){

}