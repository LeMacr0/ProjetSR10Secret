var express = require('express');
var userModel = require('../model/utilisateur.js');
var proposalsModel = require('../model/proposal.js');
var offersModel = require('../model/offer.js');
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

router.get('/delete_offer/:numero', async (req, res, next) => {
    let data = await offersModel.read(req.params.numero);

    res.render('recruiter/offer/delete', { 
        title: 'Suppression d\'offre',
        id: data.numero,
		
    });
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

module.exports = router;