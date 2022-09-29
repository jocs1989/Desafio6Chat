const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const express = require("express");
const { NONAME } = require("dns");
const Contenedora = require(__dirname + "/routes/contenedora.js");
const articulos = new Contenedora(__dirname + "/routes/articulos.txt");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const chat = require(__dirname + "/routes/chat.js");
const jsonParser = bodyParser.json();
const productos = require(__dirname + "/routes/productos.js");
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use('/productos/', productos);
app.use('/public', express.static(__dirname + '/public'));//agrega capeta publiva
app.use('/static', express.static(__dirname + '/static')); //agrega metodos estaticos
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //para desifrar lo que se manda por post
app.set('view engine', '.hbs') //motor de plantillas a utilizar
app.set('views',__dirname +"/views/hbs");//directorio donde estan los archivos de plantillas
app.engine(".hbs",exphbs.engine({
  extname:".hbs",
  defaultLayout:__dirname+"/views/hbs/layouts/index.hbs",
  layoutsDir:__dirname+"/views/hbs/layouts/",
  partialsDir: __dirname+"/views/hbs/partials/"
}))


app.get("/", async (req, res) => {
  res.status(200).redirect('/productos');
});


const PORT =process.env.PORT||8080
const listener = httpServer.listen(PORT, function () {
  try {
    //integrantes.deleteAll()
    console.log("Your app is listening http://localhost:8080 ");
  } catch (err) {
    console.error(err);
  }
});

io.on('connection', (socket) => {
 
  console.log('Usuario conectado') 
    
  socket.on('agregar', async(data) => {
    console.log(data)   
    const valores=await articulos.getAll()
    let idmax=valores[valores.length-1].id
    data.id=idmax
    valores.push(data)
    console.log(valores)
    io.sockets.emit('resultado', valores) 
})
  })
