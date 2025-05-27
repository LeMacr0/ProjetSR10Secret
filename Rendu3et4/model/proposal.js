var db = require('./db.js');

function read(id_candidat, num_offre) {
    return new Promise((res, rej) => {
        db.query("SELECT * FROM Candidature WHERE id_candidat=? AND num_offre=?", [id_candidat,num_offre], (err, data) => {
            if (err) return rej(err);
            if (data.length === 0) rej(new Error("No result found"));
            res(data[0]);
        });
    });
}


function createProposal(id_candidat, num_offre, date_de_candidature, piece_jointe) {
    let sql = "INSERT INTO Candidature (id_candidat, num_offre, date_de_candidature, piece_jointe) VALUES (?,?,?,?)";

    return new Promise((res, rej) => {
        db.query(sql, [id_candidat, num_offre, date_de_candidature, piece_jointe], (err, data) => {
            if (err) return rej(err);
            res(data);
        });
    });
}

function deleteProposal(id_candidat, num_offre) {
    return new Promise((res, rej) => {
        db.query("DELETE FROM Candidature WHERE id_candidat=? AND num_offre=?", [id_candidat,num_offre], (err, data) => {
            if (err) return rej(err);
            res(data);
        })
    });
}

module.exports = { read, createProposal, deleteProposal }