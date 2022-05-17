<?php
	$entrada=fopen('php://input','r');
	$datos=fgets($entrada);
	$paises=simplexml_load_string($datos);
	
    $al = array("Baden-Wurtemberg", "Baviera", "Berlín", "Brandeburgo", "Bremen", "Hamburgo", "Hesse", 
    "Mecklemburgo-Pomerania Occidental", "Baja Sajonia", "Renania del NorteWestfalia", "Renania-Palatinado", 
    "Sarre", "Sajonia", "Sajonia-Anhalt", "Shleswig-Holstein", "Turingia");
    $fr = array("Alsacia", "Aquitania", "Auvernia", "Borgona", "Bretaña", "ChampagneArdenne", "Córcega", "Franche-Comté", 
    "Languedoc-Roussillon", "Limousin", "Lorraine", "Midi-Pirineos", "Nord Pas-de-Calais", "Normandía", "País del Loira", "Paris Ile-de-France", 
    "Picardía", "Poitou-Charentes", "Provenza", "Rhône-Alpes", "Riviera Costa Azul", "Valle del Loira");
    $ig = array("Gran Londres (Greater London)", "Sudeste de Inglaterra (South East England)", "Sudoeste de Inglaterra (South West England)", 
    "Midlands del Oeste (West Midlands)", "Noroeste de Inglaterra (North West England)", "Nordeste de Inglaterra (North East England)", 
    "Yorkshire y Humber (Yorkshire and the Humber)","Midlands Oriental (East Midlands)","Este de Inglaterra (East of England)");
    $it = array("Abruzzo", "Basilicata", "Calabria", "Campania", "Cerdeña", "Emilia Romagna", "Friuli-Venezia Giulia", "Lazio", "Liguria", 
    "Lombardia", "Marche", "Molise", "Piamonte", "Puglia", "Sicilia","Toscana", "Trentino Alto Adige", "Umbria", "Valle d'Aosta", "Veneto");
    $pt = array("Alentejo", "Algarve", "Gran Lisboa", "Región de Lisboa", "Lisboa y Valle del Tajo", "Regiones Autónomas de Portugal", 
    "Región Centro (Portugal)", "Región Norte (Portugal)");


	$cadena = "<regiones>";

	foreach ($paises as $pais) {
		$nom = $pais->nombre;
		if ($nom == "al") {
			$regiones = $al;
		}
		elseif ($nom == "fr") {
			$regiones = $fr;
		}
		elseif ($nom == "ig") {
			$regiones = $ig;
		}
		elseif ($nom == "it") {
			$regiones = $it;
		}
		elseif ($nom == "pt") {
			$regiones = $pt;
		}
		foreach ($regiones as $region) {
			$cadena=$cadena."<region>".$region."</region>";
		}
	}
	$final = $cadena."</regiones>";

	header('Content-type:text/xml');
	
	echo $final;
				

?>