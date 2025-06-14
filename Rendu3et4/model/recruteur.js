var db = require('./db.js');

module.exports={
    recruiteroffers : function(recruiter, callback){
        db.query("SELECT * FROM Offre o Join Recruteur r WHERE o.recruteur = ?",[recruiter], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    addoffer : function(numero, etat, date_validite, indication, nbr_piece, fiche_de_poste, recruteur, callback){
        db.query("INSERT INTO Offre ( numero, etat, date_validite, indication, nbr_piece, fiche_de_poste, recruteur) VALUES (?, ?, ?, ?, ?, ?, ?)",[numero, etat, date_validite, indication, nbr_piece, fiche_de_poste, recruteur], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    editoffer : function(numero, etat, date_validite, indication, nbr_piece, fiche_de_poste, recruteur, callback){
        db.query("UPDATE Offre SET numero=?, etat=?, date_validite=?, indication=?, nbr_piece=?, fiche_de_poste=?,recruteur=? WHERE numero=?",[numero, etat, date_validite, indication, nbr_piece, fiche_de_poste, recruteur], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    deleteoffer : function(numero, callback) {
        db.query("DELETE FROM Offre WHERE numero=?",[numero], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    getpostfiles : function(callback) {
        db.query("SELECT * FROM Fiche_poste", function(err,results){
            if(err) throw err;
            callback(results);
        });
    },
}