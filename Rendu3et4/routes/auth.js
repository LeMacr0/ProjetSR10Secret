const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.post('/login', (req, res) => {
	 // Vérification des informations d'identification de l'utilisateur
	 if (req.body.username === 'user' && req.body.password === pwd) {
		 // Création d'une session utilisateur
		 req.session.user = req.body.username;
		 // Ajouter le rôle aussi dans la session
		 Req.session.role = 'user' ;
		 res.send('Authentification réussie !');
	 } else {
		res.send('Nom d\'utilisateur ou mot de passe incorrect.');
	 }
});

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/auth/login');
		}
	});
});

router.get('/profil', (req, res) => {
	if (req.session.user) {
		res.render('profil');
	} else {
		res.redirect('/auth/login');
	}
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

module.exports = router;
