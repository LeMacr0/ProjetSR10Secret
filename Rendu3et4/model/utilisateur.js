var db = require('./db.js');

module.exports = {

    read: function (nom, callback) {
        db.query("SELECT * FROM Utilisateur WHERE nom= ?", [nom], function (err, results) {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    readall: function (callback) {
        db.query("SELECT * FROM Utilisateur", function (err, results) {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    areValid: function (id, password, callback) {
		db.query("SELECT pwd FROM Utilisateur WHERE id = ?", [id], function (err, results) {
			if (err) {
				// En cas d'erreur SQL, on passe l'erreur au callback
				return callback(err, null);
			}

			if (results.length === 1 && results[0].pwd === password) {
				// Si l'utilisateur est trouvé et le mot de passe correspond, on retourne true
				callback(null, true);
			} else {
				// Si l'utilisateur n'est pas trouvé ou le mot de passe ne correspond pas, on retourne false
				callback(null, false);
			}
		});
	},

    create: function (id, nom, prenom, mdp, tel,ddc,satut, callback) {
        db.query("INSERT INTO Utilisateur (id_utilisateur, nom, prenom, mdp, tel, ddc, statut) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
            [id, nom, prenom, mdp, tel,ddc,satut],
            function (err, results) {
                if (err) return callback(err);
				callback(null, results);
            });
    }
};
