if (document.addEventListener)
	window.addEventListener("load",inicio)
else if (document.attachEvent)
	window.attachEvent("onload",inicio);

function inicio(){
	let boton=document.getElementById("buscar");
	if (document.addEventListener)
		boton.addEventListener("click",proceso)
	else if (document.attachEvent)
		boton.attachEvent("onclick",proceso);
}
//variable que contendra la peticion
let peticion;

function proceso(){
	// primer paso crear objeto
	if (window.XMLHttpRequest)
		peticion=new XMLHttpRequest()
	else if (window.ActiveXObject)
		peticion=new ActiveXObject("Microsoft.XMLHTTP");
	
	// segundo paso asignar evento readystatechange
	if (document.addEventListener)
		peticion.addEventListener("readystatechange",procesar)
	else if (document.attachEvent)
		peticion.attachEvent("onreadystatechange",procesar);

    //--------------------------------------------------------------------------------
    // tercer paso establecer conexión con el servidor

	//obtengo el nodo de la select de comunidades autonomas
	let autores = document.getElementById("autores");
	//obtengo el valor del option seleccionado
	let autor = autores.options[autores.selectedIndex].value;
    console.log(autor);
    //--------------------------------------------------------------------------------
		// solicitud a un programa php con paso de parámetros en variable
		// mediante get
	peticion.open("GET","php/practica-05-01.php?autor="+autor);
	
	//quinto paso realizar la solicitud al servidor
		// si no se pasan parámetros o bien se pasan parámetros mediante
		// get
	peticion.send(null);	
}

function procesar(){
	if (peticion.readyState==4)
		if (peticion.status==200){
			// tratar datos recibidos
				// dato recibido que no es xml
                console.log(peticion.responseText);
                document.getElementById("principal").value=peticion.responseText;	
		}
}
