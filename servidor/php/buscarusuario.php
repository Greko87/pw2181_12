<?php
include 'conexiones.php'; //agregamos el php de conexiones a este php
function buscarusuario(){
	$respuesta = false;//se usa para validar condicion
	$usuario=$_POST["usuario"];
	
	//Conectarnos al servidor de BD
	$con=conecta();
	$consulta="select usuario,nombre,clave from usuarios where usuario='".$usuario."' limit 1";
	$resConsulta=mysqli_query($con,$consulta);
	$nombre = "";
	$clave = "";
	if(mysqli_num_rows($resConsulta) > 0){
		$respuesta = true;
		while($regConsulta=mysqli_fetch_array($resConsulta)){
			$nombre = utf8_emcode($regConsulta["nombre"]);
			$clave = $regConsulta["clave"];
		}

	}
	$salidaJSON = array('respuesta' => $respuesta,
						'nombre' => $nombre,
						'clave' => $clave);//arr y tabulador, devuelve al json al js
	//var_dump($salidaJSON);
	print json_encode($salidaJSON);
}
	$opc=$_POST["opc"];//arreglo que tiene acceso a los parametros
	switch ($opc) {
		case 'buscarUsuario':
			buscarusuario();
			break;
		
		default:
			# code...
			break;
	}

?>