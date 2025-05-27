var db = require('./db.js');

function read(numero) {
    return new Promise((res, rej) => {
        db.query("SELECT * FROM Fiche_de_poste WHERE numero=?", [numero], (err, data) => {
            if (err) return rej(err);
            
            res(data);
        });
    });
}

function createPostFile(numero, intitule, statut_poste, responsable, type_metier, lieux, rythme, description, salaire) {
    let sql = `
        INSERT INTO Fiche_de_Poste (
            numero, intitule, statut_poste, responsable, type_metier, lieux, rythme, description, salaire
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((res, rej) => {
        db.query(sql, [numero, intitule, statut_poste, responsable, type_metier, lieux, rythme, description, salaire], (err, data) => {
            if (err) return rej(err);
            res(data);
        });
    });
}

function deletePostFile(numero) {
    return new Promise((res, rej) => {
        db.query("DELETE FROM Fiche_de_poste WHERE numero=?", [numero], (err, data) => {
            if (err) return rej(err);
            res(data);
        });
    });
}

module.exports = {
    read, createPostFile, deletePostFile
}