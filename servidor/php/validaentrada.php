<?php
include 'conexiones.php'; //agregamos el php de conexiones a este php
function valida(){
	$respuesta = false;//se usa para validar condicion
	$usuario=$_POST["usuario"];
	$clave=md5($_POST["clave"]);//md5 en caso de que este cifrada
	//Conectarnos al servidor de BD
	$con=conecta();
	$consulta="select usuario,clave from usuarios where usuario='".$usuario."' and clave='".$clave."' limit 1";
	$resConsulta=mysqli_query($con,$consulta);
	if(mysqli_num_rows($resConsulta) > 0){
		$respuesta = true;
	}
	$salidaJSON = array('respuesta' => $respuesta );//arr y tabulador, devuelve al json al js
	print json_encode($salidaJSON);
}
	$opc=$_POST["opc"];//arreglo que tiene acceso a los parametros
	switch ($opc) {
		case 'validaentrada':
			valida();
			break;
		
		default:
			# code...
			break;
	}

?>