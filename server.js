const Producto = require('./claseProductos')
const express = require('express')
// Cargo el módulo handlebars
const { engine } = require('express-handlebars')
const path = require('path')
const app = express()
const router = require('./routes.js')
const moment = require("moment");
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const httpServer = new HttpServer(app)
const io = new IOServer (httpServer)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Establecemos la configuración de handlerbars
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
  })
)


// Establecemos el motor de plantilla que se utiliza
app.set('view engine', 'hbs')
// Establecemos el directorio donde se encuentran los archivos de plantilla
app.set('views', './views/')

app.use('/', router)
// app.use('/static', express.static(__dirname + '/public'))
app.use(express.static("public"));

const PORT = 8080

httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:8080`)
})


const mensajes = [
	{ author: "Pedro@email.com", date: "29/03/2022 22:03:59",text: "¡Hola!" },
	{ author: "Lucia@email.com", date: "29/03/2022 22:03:58",text: "que tal?" },
	{ author: "Diego@email.com", date: "29/03/2022 22:03:57",text: "Como están todos?" }
];

io.on('connection', socket => {

	console.log("Un cliente se ha conectado");

	io.sockets.emit("mensajes", mensajes);

	io.sockets.emit("productos", { productos: Producto.listarProducto });

	socket.on("producto", data => Producto.nuevoProducto(data));

	socket.on("new-message", dato => {
		dato.date = moment().format("DD/MM/YYYY  HH:MM:SS");
		mensajes.push(dato);
		io.sockets.emit("mensajes", mensajes);
	});
});




