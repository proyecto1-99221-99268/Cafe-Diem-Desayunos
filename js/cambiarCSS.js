function cargarCSS(){
	var estilo = localStorage.getItem("css");
  	if (estilo == null){
  		//por defecto se carga este css
	  	estilo = "css/estilosB.css"
	  	document.getElementById("cssArchivo").href=estilo;
	}
	else
	{
	  	document.getElementById("cssArchivo").href=estilo;
	}
  	var boton = document.getElementById("cambiarCSS");
	boton.setAttribute("onclick", "cambiarArchivoCss()");
}


function cambiarArchivoCss() { 
	var estilo = localStorage.getItem("css");
	if (estilo == null | estilo == "css/estilosB.css")
		estilo = "css/estilosA.css";
	else //es estilosA
		estilo = "css/estilosB.css";
	document.getElementById("cssArchivo").href=estilo;
	localStorage.removeItem("css");
	localStorage.setItem("css",estilo);
}