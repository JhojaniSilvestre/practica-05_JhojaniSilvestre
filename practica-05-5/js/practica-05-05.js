if (document.addEventListener)
	window.addEventListener("load",inicio)
else if (document.attachEvent)
	window.attachEvent("onload",inicio);

function inicio(){
	let boton=document.getElementById("solucionar");
	if (document.addEventListener)
        boton.addEventListener("click",proceso)
	else if (document.attachEvent)
        boton.attachEvent("onclick",proceso);
}

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
	
	// tercer paso establecer conexión con el servidor
	
		// solicitud a un programa php con paso de parámetros en variable
		// mediante get
	peticion.open("POST","php/practica-05-05.php");
	
	// cuarto paso establecer la cabecera si es necesaria
		// cabecera para paso de parámetros con POST y envío de JSON
	peticion.setRequestHeader("Content-Type","application/json");
	
	//quinto paso realizar la solicitud al servidor
		// si no se pasan parámetros o bien se pasan parámetros mediante
		// get
	let a=document.getElementById("a").value;
	let b=document.getElementById("b").value;
    let c=document.getElementById("c").value;
    //comprobamos que no estén vacios y sean valores numericos
    let valido1= solonumeros(a);
    let valido2= solonumeros(b);
    let valido3= solonumeros(c);
    //si alguno es false, muestro mensaje
    if (!valido1 || !valido2 || !valido3) {
        alert("introduzca los datos correctos");
    }
    else{
        //creo el objeto ecuacion de la cuarta forma
        var datos = new ecuacion(a,b,c);
        //convierto los datos a json
        let datosJSON=JSON.stringify(datos);
        peticion.send(datosJSON);
        
        /*for(var dato in valores){console.log(dato+" "+eval("datos."+dato)+"<br />");}*/
    }
	
}

function procesar(){
	if (peticion.readyState==4)
		if (peticion.status==200){
			// tratar datos recibidos
				// dato recibido que no es xml
            let misdatos=JSON.parse(peticion.responseText);
			document.getElementById("sol1").value=misdatos.solucion1;
            document.getElementById("sol2").value=misdatos.solucion2;
			
		}
}

class ecuacion{
    constructor(a,b,c){
        this.a=a;
        this.b=b;
        this.c=c;
    }
}

function solonumeros(dato){
    let valido=true;
    if (dato == "") {
        valido = false;
    }
    else{
        let pos=0;
        while (valido && pos < dato.length) {
            if (dato.charAt(pos) < "0" || dato.charAt(pos) > "9") {
                valido=false;
            }
            pos++;
        }
    }
    return valido;
}



