
var inicioApp = function(){
	var Aceptar = function(){
		var usuario =$("#txtUsuario").val();
		var clave =$("#txtClave").val();
		var parametros="opc=validaentrada"+
		"&usuario="+usuario+
		"&clave="+clave+
		"&aleatorio="+Math.random();
	$.ajax({
		cache:false,//desactivando el cache
		type: "POST",
		dataType: "json",
		url: "php/validaentrada.php",
		data: parametros,
		success: function(response){
			if(response.respuesta == true){
				//alert("Bienvenido");
				//ocultamos el inicio
				$("#secInicio").hide("slow");
				//aparecemos usuarios
				$("#frmUsuarios").show("slow");
				//cursor en el primer cuadro de texto
				$("#txtNombreUsuario").focus();
			}else{
				alert("Usuario o Clave incorrecta(s)");
			}
		},
		error: function(xhr,ajaxOptions,thrownError){
		}
	});	
	}
	var buscarUsuario = function(){
		var $("#txtNombreUsuario").val();
		var parametros = "opc=buscarUsuario"+
						"&usuario="+usuario+
						"&aleatorio="+Math.random();
		if(usuario != ""){
		$.ajax({
		cache:false,//desactivando el cache
		type: "POST",
		dataType: "json",
		url: "php/buscarusuario.php",
		data: parametros,
		success: function(response){
			if(response.respuesta == true){
				$("txtNombre").val(response.nombre);
				$("txtClaveUsuario").val(response.clave);
			}else{
				$("txtNombre").focus();
			}
		},
		error: function(xhr,ajaxOptions,thrownError){
		}
	   });	

	  }
	}

	var TeclaNombreUsuario = function(tecla){
		if(tecla.which == 13){
			buscarUsuario();
		}

	}
	$("#btnAceptar").on("click",Aceptar);
	$("#txtNombreUsuario").on("keypress",teclaNombreUsuario);
}
$(document).ready(inicioApp);