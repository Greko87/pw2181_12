const {app, BrowserWindow}= require('electron');
const path=require('path'); 
const url= require('url'); 
const electron = require('electron');
const fs = require('fs'); 
const os = require('os'); 
const ipc = electron.ipcMain;
const shell = electron.shell;

let PantallaPrincipal;

//objetos globales para compartir datos entre pantallas
global.infoUsuarios = {
	usuario: '',
	usuariovalida: '',
	periodoactual: ''
}
global.infoGrupos = {
	clavemateria: '',
	grupo: ''
}


function muestraPantallaPrincipal(){
	PantallaPrincipal= new BrowserWindow({width:400,height:400});
	PantallaPrincipal.loadURL(url.format({
		pathname: path.join(__dirname,'index.html'),
		protocol: 'file',
		slashes: true 
	}));
	PantallaPrincipal.webContents.openDevTools();
	PantallaPrincipal.show();
}

// evento para PDF (declaración)
ipc.on('print-to-pdf', function(event){
	const pdfPath=path.join(os.tmpdir(),'print.pdf')
	const win=BrowserWindow.fromWebContents(event.sender)
	win.webContents.printToPDF({},function(error,data){
		if(error) throw error
		fs.writeFile(pdfPath,data,function(error){
			if(error){
				throw error
			}
			shell.openExternal('file://'+pdfPath)
			win.close()
		})
	})
});

//inicializa la app
app.on('ready',muestraPantallaPrincipal);