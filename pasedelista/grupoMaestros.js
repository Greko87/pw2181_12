const {BrowserWindow}= require('electron').remote;
const app= require('electron').app;
const path=require('path');
const url= require('url'); 
const $ = require('jquery');  

const ipc=require('electron').ipcRenderer

const usuario = require('electron').remote.getGlobal('infoUsuarios').usuario;
const usuariovalida = require('electron').remote.getGlobal('infoUsuarios').usuariovalida;
const periodoactual = require('electron').remote.getGlobal('infoUsuarios').periodoactual;
const botonPDF = document.getElementById('btnPDF');

let PantallaAlumnos;

var grupos = new Array();

function datos(clavemateria,grupo,materia,horalunes,horamartes,horamiercoles,horajueves,horaviernes){
	this.clavemateria = clavemateria;
	this.grupo = grupo;
	this.materia= materia;
	this.horalunes=horalunes;
	this.horamartes=horamartes;
	this.horamiercoles=horamiercoles;
	this.horajueves=horajueves;
	this.horaviernes=horaviernes;
}

function cargaGrupos(){
	$.ajax({
		url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienegrupos2.php?usuario='+usuario+'&usuariovalida='+usuariovalida+'&periodoactual='+periodoactual,
		dataType: 'json',
		success: function(data){
			if(data.respuesta == true){
				console.log("grupos cargados");
				var numGrupos=data.grupos[0].cantidad;
				var clavemateria="";
				var grupo="";
				var materia="";
				var horalunes="";
				var horamartes="";
				var horamiercoles="";
				var horajueves="";
				var horaviernes="";
				var resultado="";
				for (var i = 1; i <= numGrupos; i++) {
					clavemateria = data.grupos[i].clavemateria;
					grupo =data.grupos[i].grupo;
					materia =data.grupos[i].materia;
					horalunes =data.grupos[i].horalunes;
					horamartes =data.grupos[i].horamartes;
					horamiercoles =data.grupos[i].horamiercoles;
					horajueves =data.grupos[i].horajueves;
					horaviernes =data.grupos[i].horaviernes;
					//Desplegando Grupos de Materias
					resultado = "<tr><td>"+clavemateria+"</td><td>"+materia+"</td><td>"+horalunes+"</td><td><button id='"+(i-1)+"'>Ir</button></td></tr>";
					$("#lstMaterias").append(resultado);
					grupos[(i-1)] = new datos(clavemateria,grupo,materia,horalunes,horamartes,horamiercoles,horajueves,horaviernes);
					
				}
			}
			else{
				console.log("grupos no cargados");
			}
		}
	});
}

function botonIr(){
	//envia el codigo de la materia seleccionada this.id es el indice del botón//
	require('electron').remote.getGlobal('infoGrupos').clavemateria= grupos[this.id].clavemateria; 
	require('electron').remote.getGlobal('infoGrupos').grupo= grupos[this.id].grupo;
//---------------------------------------------------------------------------------------------------//
	//Enviandome al listado de Alumnos
	PantallaAlumnos= new BrowserWindow({width:800,height:425});
	PantallaAlumnos.loadURL(url.format({
		pathname: path.join(__dirname,'listaAlumnos.html'),
		protocol:'file', 
		slashes:true
	}));
	PantallaAlumnos.webContents.openDevTools();
	PantallaAlumnos.show();
}
$("body").on("click","td > button", botonIr);


cargaGrupos();

botonPDF.addEventListener('click',function(event){
	botonPDF.style.display="none"  //desaparece el boton antes de imprimir
	ipc.send('print-to-pdf')
	PantallaAlumnos.show();
});