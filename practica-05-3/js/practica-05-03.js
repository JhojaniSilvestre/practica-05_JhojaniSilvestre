if (document.addEventListener)
	window.addEventListener("load",inicio)
else if (document.attachEvent)
	window.attachEvent("onload",inicio);

function inicio(){
	let boton=document.getElementById("calculo");
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
	let caras = document.getElementById("caras").value.trim();
	let vertices = document.getElementById("vertices").value.trim();
	
	let carasNumero = soloNumeros(caras);
	let verticeNumero = soloNumeros(vertices);
    //--------------------------------------------------------------------------------

	if (carasNumero && verticeNumero) {
		// solicitud a un programa php con paso de parámetros en variable
		// mediante get
		peticion.open("POST","php/practica-05-03.php");

		//quinto paso realizar la solicitud al servidor
		// si no se pasan parámetros o bien se pasan parámetros mediante post
		let datos= new FormData();//creo objeto formdata
		datos.append("caras",caras);
		datos.append("vertices",vertices);
		peticion.send(datos);		
	}
	else{
		alert("introduzca el numero de caras y vértices");
	}
	
}

function procesar(){
	if (peticion.readyState==4)
		if (peticion.status==200){
			// tratar datos recibidos
				// dato recibido que no es xml
                console.log(peticion.responseText);
                document.getElementById("aristas").value=peticion.responseText;	
		}
}

function soloNumeros(dato){
	let esnum= true;
    let pos = 0;
	if (dato == "") {
		esnum= false;
	}
	else{
		while (esnum && pos < dato.length) {
			if (dato.charAt(pos) < "0" || dato.charAt(pos) > "9") {
				esnum = false;
			}
			pos+=1;
		}
	}

    return esnum;
}
