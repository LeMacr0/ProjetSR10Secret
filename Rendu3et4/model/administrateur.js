var db = require('./db.js');

module.exports={
    //modele pour afficher tout les formulaires 
    allform: function (callback) {
            db.query("SELECT * FROM Formulaire", function (err, results) {
                if (err) throw err;
                callback(results);
            });
        },
    //modele pour afficher tout les formulaire avec un etat precis
    stateform: function(type,state,callback){
            db.query("SELECT * FROM Formulaire WHERE etat = ? AND type = ?",[state,type], function(err,results){
                if(err) throw err;
                callback(results);
            });
    },
	
	//CRUD
	read: function (id_admin, callback) {
        db.query("SELECT * FROM Administrateur WHERE id_admin= ?", [id_admin], function (err, results) {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    readall: function (callback) {
        db.query("SELECT * FROM Administrateur", function (err, results) {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },
	
	create: function (id_admin, utilisateur, callback) {
        db.query("INSERT INTO Administrateur (id_admin, utilisateur) VALUES ( ?, ?)",
            [id_admin, utilisateur],
            function (err, results) {
                if (err) return callback(err);
				callback(null, results);
            });
    },
	
	deleteAdmin : function (id_admin, callback) {
        db.query("DELETE FROM Administrateur WHERE id_admin=?", [admin],
            function (err, results) {
                if (err) return callback(err);
				callback(null, results);
           });
	}
}