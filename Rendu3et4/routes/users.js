const express = require('express');
const router = express.Router();
const userModel = require('../model/utilisateur');

// Route 1 : afficher tous les utilisateurs
router.get('/userslist', async function (req, res, next) {
  try {
    // Encapsulation de la fonction readall dans une Promise
    const allUsers = await new Promise((resolve, reject) =>
      userModel.readall((err, results) => {
        if (err) return reject(err); // Si une erreur se produit, on rejette la promesse
        resolve(results); // Sinon, on résout la promesse avec les résultats
      })
    );

    // Encapsulation de la fonction read dans une Promise
    const result = await new Promise((resolve, reject) =>
      userModel.read('toto', (err, results) => {
        if (err) return reject(err); // Si une erreur se produit, on rejette la promesse
        resolve(results); // Sinon, on résout la promesse avec les résultats
      })
    );

    console.log(result); // Vérifie ce que tu obtiens dans la console

    res.render('user/usersList', {
      title: 'Tous les utilisateurs',
      users: allUsers,
      username: result[0] // Ici, on prend le premier utilisateur
    });
  } catch (err) {
    next(err); // Si une erreur se produit, on passe à la gestion des erreurs
  }
});

// Route 2 : afficher les utilisateurs dont le nom = "toto"
router.get('/toto', async function (req, res, next) {
  try {
    // Encapsulation de l'appel à userModel.read dans une Promise
    const result = await new Promise((resolve, reject) => {
      userModel.read('toto', (err, results) => {
        if (err) return reject(err); // Si une erreur se produit, on rejette la promesse
        resolve(results); // Sinon, on résout la promesse avec les résultats
      });
    });

    // Si aucun résultat n'est trouvé
    if (!result || result.length === 0) {
      return res.status(404).render('user/toto', {
        title: 'Aucun utilisateur trouvé',
        username: []
      });
    }

    // Si tout va bien, on rend la page avec les résultats
    res.render('user/toto', {
      title: 'Utilisateurs nommés toto',
      username: result
    });
  } catch (err) {
    // Si une erreur se produit, on passe à la gestion des erreurs
    console.error(err);
    next(err); // Passe l'erreur au middleware d'erreur
  }
});

//route pour afficher le formulaire d'ajoue d'utilisateur 
router.get('/add-user',function(req,res,next){
  res.render('user/adduser');
});

// route 3 pour afficher un utilisateur 
router.post('/user',async function(req,res,next){
  try{
      //recuprer les données passées via le body dela requete post 
      const user_di= req.body.identifaint;
      const user_nom=req.body.nom;
      const user_pre=req.body.prenom;
      const user_mdp=req.body.mdp;
      const user_tel=req.body.tel;
      const now=new Date();
      const user_ddc=now.toISOString().split('T')[0]; // format classique de date sql yyyy-mm-dd
      const user_satut='actif';
      
      await userModel.create(user_di,user_nom,user_pre,user_mdp,user_tel,user_ddc,user_satut);
      res.send('utilisateur ajouter avec succès !');
  } catch (err) {
      next (err); // gestion des erreur 
    }
});

module.exports = router;
