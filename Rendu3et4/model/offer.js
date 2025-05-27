var db = require('./db.js');

function read(numero) {
    return new Promise((res, rej) => {
        db.query("SELECT * FROM Offre WHERE numero=?", numero, (err, data) => {
            if (err) rej(err);
            
            res(data);
        });
    });
}

function readAll() {
    return new Promise((res, rej) => {
        db.query("SELECT * FROM Offre", (err, data) => {
            if (err) rej(err);
            res(data);
        });
    });
}

function readAllWithSearch(tri, optionsearch, search) {
    var sql=`
        SELECT Offre.numero, Offre.etat, Offre.indication, Entreprise.nom
        FROM Offre 
        JOIN Recruteur ON Recruteur.id_recruteur = Offre.recruteur JOIN Entreprise ON Recruteur.entreprise = Entreprise.siren 
        WHERE Offre.` + db.escapeId(optionsearch) + `LIKE ? 
        ORDER BY Offre.` + db.escapeId(tri) + `;
    `;

    return new Promise((res, rej) => {
        db.query(sql, [search], (err, data) => {
            if (err) rej(err);
            res(data);
        });
    });
}

function readAllFromOrganisationWithSearch(entreprise, tri, optionsearch, search) {
    var sql= `
        SELECT Offre.numero, Offre.etat, Offre.indication, Entreprise.nom 
        FROM Offre 
        JOIN Recruteur ON Recruteur.id_recruteur = Offre.recruteur JOIN Entreprise ON Recruteur.entreprise = Entreprise.siren 
        WHERE Entreprise.nom=? 
        AND Offre.` + db.escapeId(optionsearch) + `LIKE ? 
        ORDER BY Offre.` + db.escapeId(tri) + `;
    `;
    
    return new Promise((res, rej) => {
        db.query(sql, [entreprise, search], (err, data) => {
            if (err) rej(err);
            res(data);
        });
    });
}

function createOffer(numero, etat, validityDate, indication, nbPieces, postFile, recruteur) {
    let sql = `
        INSERT INTO Offre (
            numero,
            etat,
            date_validite,
            indication,
            nbr_piece,
            fiche_de_poste,
			recruteur
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((res, rej) => {
        db.query(sql, [numero, etat, validityDate, indication, nbPieces, postFile, recruteur], (err, data) => {
            if (err) rej(err);
            res(data);
        });
    });
}

function setOfferState(numero, state) {
    return new Promise((res, rej) => {
        db.query("UPDATE Offre SET etat=? WHERE numero=?", [state, numero], (err, data) => {
            if (err) rej(err);
            res(data);
        });
    });
}

function editOffer(numero, etat, validityDate, indication, nbPieces, postFile, recruteur) {
    let sql = `
        UPDATE Offre SET
            numero=?,
            etat=?,
            date_validite=?,
            indication=?,
            nbr_piece=?,
            fiche_de_poste=?,
			recruteur=?
        WHERE numero=?
    `;

    return new Promise((res, rej) => {
        db.query(sql, [numero, etat, validityDate, indication, nbPieces, postFile, recruteur, numero], (err, data) => {
            if (err) rej(err);
            res(data);
        });
    });
}

function deleteOffer(numero) {
    return new Promise((res, rej) => {
        db.query("DELETE FROM Offre WHERE numero=?", [numero], (err, data) => {
            if (err) rej(err);
            res(data);
        });
    });
}

module.exports = { 
    read, readAll, readAllWithSearch, readAllFromOrganisationWithSearch,
    createOffer, setOfferState, editOffer, deleteOffer
}