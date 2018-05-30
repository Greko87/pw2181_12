
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
		var usuario = $("#txtNombreUsuario").val();
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
	var Guardar = function(){
		var usuario=$("#txtNombreUsuario").val();
		var nombre=$("#txtNombre").val();
		var clave=$("#txtClaveUsuario").val();
		var parametros="opc=guardarUsuario"+
						"&usuario="+usuario+
						"&clave="+clave+
						"&aleatorio="+Math.random();
		if(usuario != "" && nombre !=""&& clave != ""){
			$.ajax({
		cache:false,//desactivando el cache
		type: "POST",
		dataType: "json",
		url: "php/guardarusuario.php",
		data: parametros,
		success: function(response){
			if(response.respuesta == true){
				alert("Guardado correctamente");
				$("#frmUsuarios > input").val("");
			}else{
				alert("Ocurrio un error, intente de nuevo mas tarde");
			}
		},
		error: function(xhr,ajaxOptions,thrownError){
		}
	});	

		}else{
			alert("Llene todos los campos correspondientes")
		}
	}

	var Borrar = function(){
		var usuario = $("txtNombreUsuario").val();
		var nombre = $("txtNombre").val();
		var pregunta = prompt("Esta seguro de borrar a "+nombre+"? (si/no)","no");
		if(pregunta != null && pregunta == "si"){
			//aqui va el ajax
			$.ajax({
		cache:false,//desactivando el cache
		type: "POST",
		dataType: "json",
		url: "php/borrarusuario.php",
		data: parametros,
		success: function(response){
			if(response.respuesta == true){
				alert("Usuario Borrado Correctamente");
				
			}else{
				alert("Ocurrio un error, intente de nuevo mas tarde");
			}
		},
		error: function(xhr,ajaxOptions,thrownError){
		}
	});	

		}else{
			alert("Error...")
		}

		}
	$("#btnAceptar").on("click",Aceptar);
	$("#txtNombreUsuario").on("keypress",teclaNombreUsuario);
	$("#btnGuardar").on("click",Guardar);
	$("#btnBorrar").on("click",Borrar);
}
$(document).ready(inicioApp);