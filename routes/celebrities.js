'use strict';

const express = require('express');
const router = express.Router();

// Necesitamos la ruta models/Celebrity para la base de datos
const Celebrity = require('../models/Celebrity');

// find para recuperar todas las celebridades
router.get('/', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    // las mostramos en index
    res.render('celebrities/index', { celebrities });
  } catch (error) {
    next(error);
  }
});
// Subir arriba
router.get('/new', async (req, res, next) => {
  res.render('celebrities/new');
});

// find para recuperar todas las celebridades
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrity = await Celebrity.findById(id);
    // las mostramos en celebrities/show
    res.render('celebrities/show', celebrity);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  // Los valores de esas claves deben provenir del formulario
  // ( req.body es el objeto lleno de los valores del formulario)
  const { _id, name, occupation, catchPhrase } = req.body;
  const celebrity = { name, occupation, catchPhrase };
  try {
    if (_id) {
      await Celebrity.findByIdAndUpdate(_id, celebrity);
    } else {
      await Celebrity.create(celebrity);
    }
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
