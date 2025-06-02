const express = require('express');
const router = express.Router();
const userModel = require('../model/candidat');

// Route 1 : afficher toute les offres
router.get('/liste_des_offres', async function (req, res, next) {
  try {
    const alloffer = await new Promise((resolve) =>
      userModel.readall(resolve)
    );
    res.render('candidate/bidofferlist', {
      title: 'Toutes les offres',
      offer: alloffer
    });
  } catch (err) {
    next(err);
  }
});

// route 2 : afficcher toute les offres d'un canddidat precis
router.get('/liste_de_mes_candidatures/:monid', async function (req, res, next){
  const monid=req.params.monid;
  try{
    const mesOffres = await new Promise((resolve)=>
      userModel.myoffer(monid,resolve)
    );
    const nboffres = await new Promise((resolve)=>
      userModel.nboffer(monid,resolve)
    );
    console.log(nboffres)
    res.render('candidate/myoffers',{
      title: 'liste de mes offres',
      myoffers : mesOffres,
      nboffers : nboffres[0].nombre_candidatures
    });
  } catch (err){
    next (err);
  }
});

//Route 3: afficher les détails d'une offre
router.get('/details_offre/:id', async function (req, res, next) {
  const idoffre = req.params.id;
  try {
    const offre = await new Promise((resolve)=>
      userModel.getoffre(idoffre, resolve)
    );
    console.log(offre)
    res.render('candidate/offerdetails',{
      dateValidite: offre.date_validite,
      numero: offre.numero,
      indication: offre.indication
    });
  } catch (err){
    next (err);
  }
});

//liste des offres d'une entreprise 


module.exports = router;