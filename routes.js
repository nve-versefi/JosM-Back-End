
const Integrante = require('./models/integrante.model');
const Directiva = require('./models/directiva.model');
const Galeria = require('./models/galeria.model');
const Info = require('./models/info.model');
const Eventos = require('./models/eventos.model');
const multer = require('multer');
const path = require('path'); 

const express = require('express');
const router = express.Router();



router.post('/api/integrantes', async (req, res) => {
    try {
      const nuevoIntegrante = new Integrante(req.body);
      await nuevoIntegrante.save();
      res.status(201).json(nuevoIntegrante);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  });
  
  // Ruta para agregar un nuevo elemento en otra tabla
  router.post('/api/directivas', async (req, res) => {
    try {
      const nuevoElemento = new Directiva(req.body);
      await nuevoElemento.save();
      res.status(201).json(nuevoElemento);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  });
  
  router.post('/api/galerias', async (req, res) => {
    try {
      const gal = new Galeria(req.body);
      await gal.save();
      res.status(201).json(gal);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  });


  
  
  // Ruta para obtener todos los integrantes
  router.get('/api/integrantes', async (req, res) => {
    try {
      const integrantes = await Integrante.find();
      res.status(200).json(integrantes);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  });
  
  // Ruta para obtener todos los elementos de otra tabla
  router.get('/api/directivas', async (req, res) => {
    try {
      const elementos = await Directiva.find();
      res.status(200).json(elementos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  });
  
  
  router.get('/api/galerias', async (req, res) => {
    try {
      const elementos = await Galeria.find();
      res.status(200).json(elementos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  });
  
  
  router.get('/api/infos', async (req, res) => {
    try {
      const elementos = await Info.find();
      res.status(200).json(elementos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  });
  
    
  router.get('/api/eventos', async (req, res) => {
    try {
      const elementos = await Eventos.find();
      res.status(200).json(elementos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  });
  

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destinoAbsoluto = path.resolve(__dirname, 'uploads');
      cb(null, destinoAbsoluto);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
  });
  
  const upload = multer({ storage: storage });
  
  router.post('/nuevoEvento', upload.fields([{ name: 'image' }, { name: 'title' }, { name: 'date' }, { name: 'description' }, { name: 'tag' }, { name: 'duration' }]), async (req, res) => {
    try {
      const nuevoEvento = new Eventos({
        imgSrc: req.files['image'][0].filename, 
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        tag: req.body.tag,
        duration: req.body.duration,
      });
  
      await nuevoEvento.save();
      res.status(201).json(nuevoEvento);
    } catch (error) {
      console.error('Error al agregar un nuevo evento:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  module.exports = router;
