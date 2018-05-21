const {BrowserWindow}= require('electron').remote;
const app= require('electron').app;
const path=require('path'); 
const url= require('url');
const $ = require('jquery'); 

const botonEntrar = document.getElementById('btnEntrar');
var usuario = document.getElementById('usuario');
var contraseña = document.getElementById('contraseña');

let PantallaMaestros;

//Eventlistener al boton para validar información de login,TRUE
botonEntrar.addEventListener('click',function(event){
	require('electron').remote.getGlobal('infoUsuarios').nombre;
	$.ajax({
		url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/validausuario.php?usuario='+$("#usuario").val()+'&clave='+$("#contraseña").val(),
		dataType: 'json',
		success: function(data){
			if(data.respuesta == true){
				console.log("Bienvenido!!!");
				require('electron').remote.getGlobal('infoUsuarios').usuario = $("#usuario").val();
				require('electron').remote.getGlobal('infoUsuarios').usuariovalida = data.usuariovalida;
				require('electron').remote.getGlobal('infoUsuarios').periodoactual = data.periodoactual;
				usuarioAceptado();
			}
			else{
				alert("Usuario y/o contraseña incorrectos");
				}
			}
		})
	});

function usuarioAceptado(){
	PantallaMaestros= new BrowserWindow({width:400,height:425});
	PantallaMaestros.loadURL(url.format({
		pathname: path.join(__dirname,'grupoMaestros.html'),
		protocol:'file', 
		slashes:true
	}));
	PantallaMaestros.webContents.openDevTools();
	PantallaMaestros.show();
}