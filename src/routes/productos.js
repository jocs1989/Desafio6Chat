const { Router } = require("express");
const router = Router(); //agrega la ruta del servidor
const Contenedora = require(__dirname + "/contenedora.js");
const articulos = new Contenedora(__dirname + "/articulos.txt");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true});
const jsonParser = bodyParser.json();
const datosAgregados={};


//GET '/api/productos' -> devuelve todos los productos.
router.get("/", async (req, res) => {
  try {
    const respuesta = await articulos.getAll();
    res.status(200).render('partials/productos',{artuculos: respuesta});
  } catch (err) {
    console.error( err);
    res.status(400).render('partials/error',{error: err.toString()});
  }
  
});

//GET '/api/productos/:id' -> devuelve un producto según su id.
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await articulos.getById(id);
    if (result === null) {
      throw new Error("No Existe el producto");
    } else {

      res.status(200).render('partials/producto',{articulo: await result})
    }
  } catch (err) {
    console.error( err);
    res.status(400).render('partials/error',{error: err.toString()});
  }
  //
});

router.get("/query:id", async (req, res) => {
  try {
    
    const { id } = req.query;    
    const result = await articulos.getById(id);
    if (result === null) {
      throw new Error("No Existe el producto");
    } else {
      res.status(200).send(await result);
    }
  } catch (err) {
    console.error( err);
    res.status(400).render('partials/error',{error: err.toString()});
  }
  //
});
//POST '/api/productos' -> recibe y agrega un producto, 
//      y lo devuelve con su id asignado.

router.post("/", urlencodedParser,jsonParser, async (req, res) => {

  try {
   console.log(req.body)
    const producto = ({
      title: title,
      price: price,
      thumbnail: thumbnail,
    } = req.body);
    

    const valores = await articulos.save(producto)
    res.status(200)
     
      //res.status(200).send( /productos)
    res.status(200).redirect('/productos');
   
    

    //res.status(200).render('partials/producto',{articulo: await articulos.save(producto)})

  } catch (err) {
    console.error( err);
    res.status(400).render('partials/error',{error: err.toString()});
  }
});

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put("/:id", jsonParser, async (req, res) => {
  try {
    const producto = req.body;
    producto.id = req.params.id;    
    res.status(200).send(await articulos.updateById(producto));
  } catch (err) {
    console.error( err);
    res.status(400).send({ error: "datos incorrectos" });
  }
});

//DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete("/:id", jsonParser, async (req, res) => {
  try {
    res.status(200).send(await articulos.deleteById(req.params.id));
  } catch (err) {
    console.error( err);
    res.status(400).send({ error: "datos incorrectos" });
  }
});
module.exports = router;
