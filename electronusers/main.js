//Aplicacion general 
const app=require('electron').app;
//Uso de las pantallas del sistema
const BrowserWindow=require('electron').BrowserWindow;
//Ruta de la carpeta base
const path=require('path');
//URL de las páginas
const url=require('url');
//Standart de ECMASCRIPT 6 - JS
let PantallaPrincipal;

function muestraPantallaPrincipal(){
	PantallaPrincipal=new BrowserWindow({width:620,height:825});
	PantallaPrincipal.loadURL(url.format({
		//join: concatenar cadenas
		pathname:path.join(__dirname,'index.html'),
		protocol: 'file',
		slashed: true;
	}));
	//clic derecho, inspeccionar en chrome
	//PantallaPrincipal.webContents.openDevTools();
	PantallaPrincipal.show();
}
app.on('ready',muestraPantallaPrincipal);
