if (document.addEventListener)
	window.addEventListener("load",inicio)
else if (document.attachEvent)
	window.attachEvent("onload",inicio);

function inicio(){
	let boton=document.getElementById("boton");
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
    //obtengo el nodo de la select de comunidades autonomas
	let select = document.getElementById("paises");
	//obtengo una collection con los option seleccionados
    let paises = select.selectedOptions;
    //obtengo el value de los options seleccionados
    if (paises.length > 0) {
		// tercer paso establecer conexión con el servidor
		// solicitud a un programa php con paso de parámetros en variable
		peticion.open("POST","php/practica-05-04.php");

		// cabecera para paso de parámetros con POST y envío de XML
		peticion.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

		//quinto paso realizar la solicitud al servidor
		let cadenaxml;
		let empiezo="<paises><pais>";
		let final="</pais></paises>";
		//defino la primera posicion
		let medio="<nombre>"+paises[0].value+"</nombre>";
		//en caso de que haya más de 1 se concatenarán
		for (let index = 1; index < paises.length; index++) {
			medio+="<nombre>"+paises[index].value+"</nombre>";
		}
		//una vez tengamos todos los paises seleccionados
		//concateno todo
		cadenaxml=empiezo+medio+final;
		console.log(cadenaxml);
		peticion.send(cadenaxml);
	}
	else{
		alert("seleccione uno o más paises");
	}
	
}

function procesar(){
	if (peticion.readyState==4)
		if (peticion.status==200){
			// tratar datos recibidos
				// dato recibido que no es xml
				console.log(peticion.status);
				let misdatos=peticion.responseXML;
				let region;
			    //obtengo el nodo de la select provincias
				let select = document.getElementById("region");

				for (let i = 0; i < misdatos.getElementsByTagName("region").length; i++) {
					region = misdatos.getElementsByTagName("region").item(i).textContent;
					//creo el nuevo nodo option de la select
					let newOption = document.createElement("option");
					//creo los nodos de texto
					let textOption=document.createTextNode(region);
					//asigno los nodos texto a los nodos option correspondientes
					newOption.appendChild(textOption);
					//asigno el nodo option al nodo select
					select.appendChild(newOption);
				}	
		}
}
