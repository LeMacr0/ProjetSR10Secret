var db = require('./db.js');

module.exports={
    readall: function (callback) {
            db.query("SELECT * FROM Offre", function (err, results) {
                if (err) throw err;
                callback(results);
            });
        },
    //modele pour l'affichage des candidature dun candidat 
    myoffer: function(id_candidate,callback){
            db.query("SELECT * FROM Candidature WHERE id_candidat = ?",[id_candidate], function(err,results){
                if(err) throw err;
                callback(results);
            });
    },

    //modele pour l'affichge du nombre de candidature d'un candidat
    nboffer: function(id_candidate,callback){
        db.query("SELECT COUNT(*) AS nombre_candidatures FROM Candidature WHERE id_candidat = ?",[id_candidate], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    // offre d'une entreprise    (pas encore fini )    
    companyoffer: function(entreprise,callback){
        db.query("SELECT * FROM Offre o JOIN Recruteur r WHERE  r.entreprise = ?",[entreprise], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },
    
    // afficher les fiche de poste en fonction des offres
    applyfile: function(offer,callback){
        db.query("SELECT * FROM Fiche_poste WHERE offre = ?",[offer], function(err,results){
            if(err) throw err;
            callback(results);
        });
    }
}