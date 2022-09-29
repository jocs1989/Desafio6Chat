

const { Router } = require("express");
const router = Router(); //agrega la ruta del servidor
const Integrante = require(__dirname + "/integrante.js");
const integrantes = new Integrante(__dirname + "/integrantes.txt");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const jsonParser = bodyParser.json();

//GET '/api/productos' -> devuelve todos los productos.
router.get("/", async (req, res) => {
  try {
    const participantes = await integrantes.getAll();
    res.status(200).render('partials/chat.hbs',{participantes:participantes});
  } catch (err) {
    console.error( err);
    res.status(400).send({ error: err.toString() });
  }
  
});

//GET '/api/productos/:id' -> devuelve un producto según su id.
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await integrantes.getById(id);
    if (result === null) {
      throw new Error("No Existe el producto");
    } else {
      res.status(200).send(await result);
    }
  } catch (err) {
    console.error( err);
    res.status(400).send({ error: err.toString() });
  }
  //
});

router.get("/query:id", async (req, res) => {
  try {
    
    const { id } = req.query;    
    const result = await integrantes.getById(id);
    if (result === null) {
      throw new Error("No Existe el producto");
    } else {
      res.status(200).send(await result);
    }
  } catch (err) {
    console.error( err);
    res.status(400).send({ error: "producto no encontrado" });
  }
  //
});
//POST '/api/productos' -> recibe y agrega un producto, 
//      y lo devuelve con su id asignado.

router.post("/", urlencodedParser,jsonParser, async (req, res) => {
  try {
      const producto = ({
      nombre,alias
    } = req.body);
   
    const usuarios=await integrantes.save(producto)
    console.log(usuarios)
    const participantes = await integrantes.getAll();
    res.status(200).render('partials/chat.hbs',{participantes:participantes,alias:alias,idPersona:usuarios.id});
  } catch (err) {
    console.error( err);
    res.status(400).render('partials/error.hbs',{ error: "datos incorrectos" });
  }
});

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put("/:id", jsonParser, async (req, res) => {
  try {
    const producto = req.body;
    producto.id = req.params.id;    
    res.status(200).send(await integrantes.updateById(producto));
  } catch (err) {
    console.error( err);
    res.status(400).send({ error: "datos incorrectos" });
  }
});

//DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete("/:id", jsonParser, async (req, res) => {
  try {
    res.status(200).send(await integrantes.deleteById(req.params.id));
  } catch (err) {
    console.error( err);
    res.status(400).send({ error: "datos incorrectos" });
  }
});
module.exports = router;
