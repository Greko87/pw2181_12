<?php
include 'conexiones.php'; //agregamos el php de conexiones a este php
function guardarUsuario(){
	$respuesta = false;//se usa para validar condicion
	$usuario= GetSQLValueString($_POST["usuario"],"text");
	$nombre = GetSQLValueString($_POST["nombre"]),"text";
	$clave = GetSQLValueString(md5($_POST["clave"]),"text");
	//Conectarnos al servidor de BD
	$con=conecta();
	//$consulta="select usuario from usuarios where usuario='".$usuario."' limit 1";
	$consulta0=sprintf("select usuario from usuarios where usuario = %s",$usuario);//convierte el contenido de la variable(%s) en cadena
	$resConsulta=mysqli_query($con,$consulta);
	$consultaGuarda = "";
	//si ya existe en la tabla el usuario
	if(mysqli_num_rows($resConsulta) > 0){
		//actualizamos
		$consultaGuarda=sprintf("update usuarios set nombre = %s,clave = %s where usuario = %s",$nombre,$clave,$usuario);
	}else{//no existe en la tabla
		$consultaGuarda=sprintf("insert into usuarios(usuario,nombre,clave) values(defalut,%s,%s,%s)",$usuario,$nombre,$clave);
	}
	mysqli_query($con,$consultaGuarda);//nomas se ejecuta la consulta
	if(mysqli_affected_rows($con)>0){//cantidad de registros afectados
		$respuesta = true;
	}

	$salidaJSON = array('respuesta' => $respuesta);//arr y tabulador, devuelve al json al js
	//var_dump($salidaJSON);
	print json_encode($salidaJSON);
}
	$opc=$_POST["opc"];//arreglo que tiene acceso a los parametros
	switch ($opc) {
		case 'guardarUsuario':
			guardarusuario();
			break;
		
		default:
			# code...
			break;
	}

?>