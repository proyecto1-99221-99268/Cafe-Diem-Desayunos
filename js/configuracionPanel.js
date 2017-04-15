//var desayunoPersonalizado=[];
var desayunos   = [];
var seleccionado = "b0";
// =new Object();""
var capas = [];
var opcionesTotales=[];
var escenario;
var opcionesDesayunos=[];

//var desayunoElegido=[]; //para clasico, especial y matero
//var opcionesElegido=[];

var todoslosdesayunos=[];
var predefinidos=[];


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
	var desayunoPersonalizado=[];	
	var text = localStorage.getItem("personalizado");
	if (text==null){
			for (var i = 0; i < opcionesTotales.length; i++) {
				var opcion = opcionesTotales[i];	
				var arreglo=new Array();
				for (var j=0;j<opcion.length;j++){
					arreglo[j]=false;
				}
				desayunoPersonalizado[i]=arreglo;
			}
			opcionesDesayunos["b0"]=desayunoPersonalizado;
		//opcionesDesayunos["b0"]=desayunoPersonalizado;  //????????????????
		}
	
	else
	{
		var obj = JSON.parse(text);
		opcionesDesayunos["b0"]=obj;
		

	}
	crearPredefinidos();
	

}


function crearPredefinidos(){
	predefinidos[0]=clasico;
	predefinidos[1]=especial;
	predefinidos[2]=matero;
	for (var k = 0; k <predefinidos.length; k++) {
	 	var desayun=crearDesayunoVacio();
	 	var d=predefinidos[k];
	 	for(var j=0; j<d.length; j++){
	 		var categoria=d[j]; 
	 		var catdes=desayun[j];
	 		for (var i = 0; i <categoria.length ; i++) {
	 			catdes[categoria[i].id]=true;
	 		}
	 	}
	 	opcionesDesayunos["b"+(k+1)]=desayun;
	 }
		

}


function mostrarPredefinido(N){
	//N es la posicion en opcionesDesayunos del desayuno que quiero mostrar
	eliminarDibujos();
	limpiarInputs();
	var amostrar=opcionesDesayunos[N];
 	for(var j=0; j<amostrar.length; j++){
 		var categoria=amostrar[j]; 
		var cat = opcionesTotales[j];
 		for (var i = 0; i <categoria.length ; i++) {
 			if (categoria[i]==true){
 				var elemento = cat[i];
				setearDibujo(elemento.imagen,elemento.nombre,elemento.x,elemento.y, elemento.w, elemento.h);
				setearCeldas(j,elemento.id);
 			}
 		}
 	}
	calcularPrecio();	


}
function configurarTipoDesayuno(event){
	var target=event.target;
	console.log(target.id);
	$(".DP").removeClass("active");
	seleccionado = target.id;
	mostrarPredefinido(target.id);
	$("#"+target.id).addClass("active");


}
function setearCeldas(idTabla,idElem){
	var todasLasTablas = $(".table");
	tabla=todasLasTablas[idTabla]; 
	var Nrofila=Math.floor(idElem/3);
	var fila = tabla.childNodes[Nrofila+1];
	var input = fila.childNodes[idElem%3].childNodes[1];
	//input.click();
	actualizarEstado(input,true);
}
function limpiarInputs(){
	$("input").prop('checked', false);
}



function mostrar(){
	var n = document.getElementById("miCanvas").offsetWidth;
	cargar();
  	KineticCanvas(n);
	$(".DP").click(configurarTipoDesayuno);
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
						var nombreC;
						if(opcionesTotales[l]==taza)
							nombreC="taza";
						else
							nombreC="bandeja";
						input.setAttribute("name", nombreC);
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
	var text = localStorage.getItem("personalizado");
	if (text!=null){
		mostrarPredefinido("b0");
	}
}


 
function pintarCanvas(event){
	
	opcionesDesayunos["b0"]=crearDesayuno(seleccionado);
	
	// localStorage.removeItem("personalizado");
	// var myJSON = JSON.stringify(desayunoPersonalizado);
	// localStorage.setItem("personalizado",myJSON);
	seleccionado="b0";
	$(".DP").removeClass("active");
	$("#"+seleccionado).addClass("active");

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
	var desayunoPersonalizado=opcionesDesayunos["b0"];
	var categoria=desayunoPersonalizado[idTabla];
	if(categoria[id]==true){
		//document.getElementById("miCanvas").innerHTML="elemento.imagen";
		categoria[id]=false;
		quitarDibujo(elemento.nombre);

	}else{
		//document.getElementById("miCanvas").innerHTML=elemento.imagen;
		setearDibujo(elemento.imagen,elemento.nombre, elemento.x, elemento.y, elemento.w, elemento.h);
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
	calcularPrecio();
}


function actualizarEstado(check,seleccionado){
	if(!seleccionado)
		check.checked=false;
	else
		check.checked=true;
	
}



function setearDibujo(source,nombre,equis,ygriega, w, h){
	var nuevaCapa = new Kinetic.Layer({id:nombre});
	//capas[nombre]=nuevaCapa;
	var imagen = new Image();
    imagen.src = source;
 	var imgFondo = new Kinetic.Image({
        image: imagen,
        draggable: true,
        x: equis,
        y: ygriega,
        width: w,
        height: h
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


function eliminarDibujos(){
	if (escenario.getChildren().length != 0)
		escenario.removeChildren();
}
function calcularPrecio(){
	var precio = 0;
	var des = opcionesDesayunos[seleccionado];
	for (var i=0 ; i<des.length;i++){
		var op = des[i];
		for (var j = 0; j <op.length; j++) {
			if (op[j]){
				var categoria= opcionesTotales[i];
				precio+=categoria[j].precioPorUnidad;
			}
		}
	}
	$("#precio").text("$"+precio);
}


function crearDesayunoVacio() {
    var Des = [];
    for (var i = 0; i < opcionesTotales.length; i++) {
		var opcion = opcionesTotales[i];	
		var arreglo=new Array();
		for (var j=0;j<opcion.length;j++){
			arreglo[j]=false;
		}
		Des[i]=arreglo;
	}
	return Des;

}
function crearDesayuno(bn) {
    var Des = [];
    var opDesa=opcionesDesayunos[bn];
    for (var i = 0; i < opDesa.length; i++) {
		var opcion = opDesa[i];	
		var arreglo=new Array();
		for (var j=0;j<opcion.length;j++){
			arreglo[j]=opcion[j] ;
		}
		Des[i]=arreglo;
	}
	return Des;

}