var express = require('express');
var router = express.Router();
var usuariosmodel = require('./../../models/usuariosmodel');

router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

//para destruir variables de session/
router.get('/logout', function (req, res, next) {
req.session.destroy(); // destruir
res.render('admin/login', {
layout:'admin/layout'
});
});


router.post('/', async (req, res, next) => {
  try {
    
    console.log(req.body);
    var usuario = req.body.usuario; 
    var password = req.body.password;

    

    var data = await usuariosmodel.getUserAndPassword(usuario, password);

    if (data != undefined) {
      req.session.id_usuario = data.id; // id > nombre de la columnas
      req.session.nombre = data.usuario;

      res.redirect('/admin/novedades');
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      })
    } // cierre else
  } catch (error) {

    console.log(error)
  }
});  // cierre del post



module.exports = router;