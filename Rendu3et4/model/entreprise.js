var db = require('./db.js');
const usersModel = require('./user.js');


function read(siren) {
    return new Promise((res, rej) => {
        db.query("SELECT * FROM Entreprise WHERE siren=?", siren, (err, data) => {
            if (err) return rej(err);
            if (data.length === 0) rej(new Error("No result found"));
            res(data[0]);
        });
    });
}

function readAllWithSearch(tri, optionsearch, search) {
    var sql=`
        SELECT *
        FROM Entreprise 
        WHERE Entreprise.` + db.escapeId(optionsearch) + `LIKE ? 
        ORDER BY Entreprise.` + db.escapeId(tri) + `;
    `;

    return new Promise((res, rej) => {
        db.query(sql, [search], (err, data) => {
            if (err) return rej(err);
            res(data);
        });
    });
}

function readAll() {
    return new Promise((res, rej) => {
        db.query("SELECT * FROM Entreprise", (err, data) => {
            if (err) return rej(err);
            res(data);
        });
    });
}

function getUserEntreprise(id_utilisateur) {
    return new Promise((res, rej) => {
        db.query("SELECT * FROM Entreprise JOIN Recruteur ON Recruteur.entreprise = Entreprise.siren JOIN Utilisateur ON Recruteur.utilisateur = Utilisateur.id_utilisateur WHERE Utilisateur.id_utilisateur = ?", [id_utilisateur], (err, data) => {
            if (err) return rej(err);
            res(data[0]);
        })
    });
}

function createEntreprise(siren, nom, type, siege_social) {
    return geocoding(address).then((coords) => {   
        let sql = "INSERT INTO Entreprise (siren, nom, type, siege_social) VALUES (?, ?, ?, ?)";

        return new Promise((res, rej) => {
            db.query(sql, [siren, nom, type, siege_social], (err, data) => {
                if (err) return rej(err);
                res(data);
            });
        });
    })
    .catch((err) => {
        throw err;
    });
}

function editEntreprise(siren, nom, type, siege_social) {

    return new Promise((res, rej) => {
        db.query("UPDATE Entreprise SET siren=?, nom=?, type=?, siege_social=? WHERE siren=?", [siren, nom, type, siege_social, siren], (err, data) => {
            if (err) return rej(err);
            res(data);
        });
    });
}

function setType(siren, type) {
    return new Promise((res, rej) => {
        db.query("UPDATE Entreprise SET type=? WHERE siren=?", [type, siren], (err, data) => {
            if (err) return rej(err);
            res(data);
        });
    });
}

function deleteEntreprise(siren) {
    return new Promise((res, rej) => {
        // PAS DE CASCADE, enlever les recruteurs de l'organisaton avant
        db.query("DELETE FROM Entreprise WHERE siren=?", [siren], (err, data) => {
            if (err) return rej(err);
            res(data);
        })
    });
}

module.exports = { 
    read, readAll, readAllWithSearch, getUserEntreprise, createEntreprise,
    editEntreprise, setType, deleteEntreprise 
}