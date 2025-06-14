var express = require('express');
var userModel = require('../model/utilisateur.js');
var proposalsModel = require('../model/proposal.js');
var offersModel = require('../model/offer.js');
var candidateModel = require('../model/candidat.js')
var recruiterModel = require('../model/recruteur.js')
var postFilesModel = require('../model/postFile.js');
var router = express.Router();



/* GET home page. */
router.get('/create_org', (req, res, next) => {
    res.render('recruiter/create_org', {title: "Création d'organisation"});
});


/*router.get('/offers', async (req, res, next) => {
    let params = {
        title: 'Liste des offres',
        
        offers: [],
        pageNumber: 0,
        maxPages: 0,
        params: {},
        
    }

    let page = req.query.page || 0;
    let size = req.query.size || 10;
    let tri = req.query.tri || 'date_creation';
    let optionsearch = req.query.optionsearch || 'nom';
    let search = '%'+(req.query.search || '')+'%';

    let data = await offersModel.readAllFromOrganisationWithSearch(req.session.user.entreprise, tri, optionsearch, search);

    let maxPages = Math.floor(data.length / size);
    page = Math.max(0, Math.min(page, maxPages));
    let offers = data.slice(page * size, (page + 1) * size);
    
    params.offers = offers
    params.pageNumber = page
    params.maxPages = maxPages
    params.params = {
        size: req.query.size,
        tri: req.query.tri,
        optionsearch: req.query.optionsearch,
        search: req.query.search
    }
    res.render('recruiter/offer/list', params);
});
*/
router.get('/post_files', async (req, res, next) => {
    let params = {
        title: 'Liste des fiches de poste',

        postFiles: [],
        pageNumber: 0,
        maxPages: 0,
        params: {},
       
    }
	
	const alloffer = await new Promise((resolve) =>
      userModel.readall(resolve)
    );
    res.render('recruiter/post_file/list', params);

});

router.get('/delete_post_file/:numero', async (req, res, next) => {
    let data = await postFilesModel.read(req.params.numero);

    res.render('recruiter/post_file/delete', { 
        title: 'Suppression d\'offre',
        numero: data.numero,
        name: data.intitule,
        
    });
});

router.get('/create_post_file', (req, res, next) => {

    res.render('recruiter/post_file/create', {title: "Création de fiche de poste"});
});


router.get('/create_offer', async function (req, res, next) {
    const data = await new Promise((resolve)=> 
        recruiterModel.getpostfiles(resolve)
    );

    res.render('recruiter/offer/create', {
        title: "Création d offre",
        postFiles: data
    
    });
});

router.post('/create_offer', async function (req, res, next) {
    const result = await new Promise((resolve)=> 
        recruiterModel.addoffer(req.body.numero, req.body.etat, req.body.date_validite, req.body.indication, req.body.nb_piece, req.body.postfile, req.body.recruteur, resolve)
    );

    res.redirect('/recruiter/offers')
});

router.get('/edit_offer/:numero', async function (req, res, next) {
    const offer = await new Promise((resolve) =>
        candidateModel.getoffre(req.params.numero, resolve)
    );
    const postfiles = await new Promise((resolve)=> 
        recruiterModel.getpostfiles(resolve)
    );

    res.render('recruiter/offer/edit', { 
        title: 'Modifier l\'offre',
        offer: offer,
        postFiles: postfiles,
    });
});

router.post('/edit_offer/:numero', async function (req, res, next) {
    const offer = await new Promise((resolve) =>
        recruiterModel.editoffer(req.params.numero, req.body.etat, req.body.date_validite, req.body.indication, req.body.nbr_piece, req.body.fiche_de_poste, req.body.recruteur, resolve)
    );

    res.redirect('/recruiter/offers')
})

router.get('/delete_offer/:numero', async function (req, res, next) {
    const offer = await new Promise((resolve) =>
        candidateModel.getoffre(req.params.numero, resolve)
    );

    res.render('recruiter/offer/delete', { 
        title: 'Suppression d\'offre',
        id: offer.numero,
    });
});

router.post('/delete_offer/:numero', async function (req, res, next) {
    const offer = await new Promise((resolve) =>
        recruiterModel.deleteoffer(req.params.numero, resolve)
    );

    res.redirect('/recruiter/offers')
})


module.exports = router;