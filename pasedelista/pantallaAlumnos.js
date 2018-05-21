const {BrowserWindow}= require('electron').remote;
const app= require('electron').app;
const path=require('path'); //muestra la ruta del archivo 
const url= require('url'); //carga una página*/
const $ = require('jquery');  //el simbolo $ indica el inicio de un jquery
const ipc=require('electron').ipcRenderer
const botonPDF = document.getElementById('btnPDF');
const usuario = require('electron').remote.getGlobal('infoUsuarios').usuario;
const usuariovalida = require('electron').remote.getGlobal('infoUsuarios').usuariovalida;
const periodoactual = require('electron').remote.getGlobal('infoUsuarios').periodoactual;

const clavemateria = require('electron').remote.getGlobal('infoGrupos').clavemateria;
const grupo = require('electron').remote.getGlobal('infoGrupos').grupo;

console.log(clavemateria);
console.log(grupo);
var alumnos = new Array();

function datos(ncontrol,apellidopaterno,apellidomaterno,nombre){
	this.ncontrol = ncontrol;
	this.apellidopaterno = apellidopaterno;
	this.apellidomaterno= apellidomaterno;
	this.nombre=nombre;
}


function cargaAlumnos(){
	$.ajax({
		url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienealumnos2.php?usuario='+usuario+'&usuariovalida='+usuariovalida+'&periodoactual='+periodoactual+'&materia='+clavemateria+'&grupo='+grupo,
		dataType: 'json',
		success: function(data){
			if(data.respuesta == true){
				console.log("alumnos cargados");

				var numAlumnos=data.alumnos[0].cantidad;
				var ncontrol="";
				var apellidopaterno="";
				var apellidomaterno="";
				var nombre="";
				var resultado="";

				for (var i = 1; i <= numAlumnos; i++) {
					ncontrol = data.alumnos[i].ncontrol;
					apellidopaterno = data.alumnos[i].apellidopaterno;
					apellidomaterno = data.alumnos[i].apellidomaterno;
					nombre = data.alumnos[i].nombre;
					
					//AQUI DEBE COLOCARSE EL HTML QUE GENERE LOS ALUMNOS, en los botones el id es A(numero) para asistencia
																								//F(numero) para falta
						resultado = "<tr><td>"+ncontrol+"</td><td>"+apellidopaterno+"</td><td>"+apellidomaterno+"</td><td>"+nombre+"</td><td><button id='A"+(i-1)+"'>Asistencia</button></td><td><button id='F"+(i-1)+"'>Falta</button></td></tr>"; 


					$("#lstAlumnos").append(resultado);
					alumnos[(i-1)] = new datos(ncontrol,apellidopaterno,apellidomaterno,nombre);
				}
			}
			else{
				console.log("alumnos no cargados");
			}
		}
	});
}

function botonIr(){
	if(this.id.indexOf('A')==0){
		var id = this.id.substr(1);
		$.ajax({
			url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/asignaincidencia.php?usuario='+usuario+'&usuariovalida='+usuariovalida+'&periodoactual='+periodoactual+'&materia='+clavemateria+'&grupo='+grupo+'&ncontrol='+alumnos[id].ncontrol+'&incidencia=1',
			dataType: 'json',
			success: function(data){
				if(data.respuesta == true){
					console.log(alumnos[id].ncontrol);
					console.log("asistencia");
					document.getElementById('A'+id).style.background="green";
					document.getElementById('F'+id).disabled=true;

				}
				else{
					console.log("No se pudo comunicar con el servidor");
					
				}
			}
		});
	}else{
		var id = this.id.substr(1);
		$.ajax({
			url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/asignaincidencia.php?usuario='+usuario+'&usuariovalida='+usuariovalida+'&periodoactual='+periodoactual+'&materia='+clavemateria+'&grupo='+grupo+'&ncontrol='+alumnos[id].ncontrol+'&incidencia=2',
			dataType: 'json',
			success: function(data){
				if(data.respuesta == true){
					console.log(alumnos[id].ncontrol);
					console.log("falta");
					document.getElementById('F'+id).style.background="red";
					document.getElementById('A'+id).disabled=true;
				}
				else{
					console.log("No se pudo comunicar con el servidor");
				}
			}
		});
	}
}

$("body").on("click","td > button", botonIr);

cargaAlumnos();

botonPDF.addEventListener('click',function(event){
	botonPDF.style.display="none"  //desaparece el boton antes de imprimir
	ipc.send('print-to-pdf')
	PantallaAlumnos.show();
});