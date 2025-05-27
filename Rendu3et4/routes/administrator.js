const express = require('express');
const router = express.Router();
const userModel = require('../model/administrateur');

// Route 1 : afficher toute les formulaires
router.get('/liste_des_formulaires', async function (req, res, next) {
  try {
    const allform = await new Promise((resolve) =>
      userModel.allform(resolve)
    );
    res.render('administrator/formlist', {
      title: 'Touts les formulaires',
      form: allform
    });
  } catch (err) {
    next(err);
  }
});

// Route 1 : afficher toute les formulaire avec n statut precis 
router.get('/liste_des_formulaires/:type/:etat', async function (req, res, next) {
    const staterecherche =req.params.etat ;
    const typerecherche =req.params.type;
    try {
      const stateform = await new Promise((resolve) =>
        userModel.stateform(typerecherche,staterecherche, resolve)
      );
      res.render('administrator/stateformlist', {
        title: 'Touts les formulaires ${staterecherche}',
        form: stateform,
        staterecherche: staterecherche,
        typerecherche: typerecherche
      });
    } catch (err){
      next(err);
    }
  });

  module.exports = router;