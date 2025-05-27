jest.mock("../model/db.js");
const DB = require("../model/db.js");
const model = require("../model/utilisateur.js");

jest.setTimeout(10000);

describe("Model Tests", () => {
    beforeAll(async () => {
        // Instructions à exécuter avant le lancement des tests
		DB.end = jest.fn((cb) => cb(null)); // Simule une fermeture propre
    });

    afterAll((done) => {
        DB.end((err) => {
          if (err) done(err);
          else done();
        });
      },10000);
      
    
    test("test when user is in data base", () => {
        function cbRead(resultat) {
            if (resultat.length > 0) {
                const nom = resultat[0].nom;
                expect(nom).toBe("toto");
            } else {
                throw new Error("No user found");
            }
        }
        model.read("toto", cbRead);
    });

    test("test when user is not in data base", () => {
        function cbRead(resultat) {
            if (resultat.length > 0) {
                const nom = resultat[0].nom;
                expect(nom).toBe("maman");
            } else {
                throw new Error("No user found");
            }
        }
        model.read("maman", cbRead);
    });

    test("readall déclenche une erreur si requête échoue", (done) => {
		DB.query.mockImplementation((sql, callback) => {
			callback(new Error("Erreur SQL"), null);
		});

		model.readall((err, results) => {
			try {
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe("Erreur SQL");
				expect(results).toBeNull();
				done();
			} catch (error) {
				done(error);
			}
		});
	});
		  

    test("read all users", (done) => {
		DB.query.mockImplementation((sql, callback) => {
			callback(null, [
				{ nom: "Dupont", prenom: "Jean" },
				{ nom: "Durand", prenom: "Claire" }
			]);
		});

		function cbReadAll(err, resultat) {
			try {
				expect(err).toBeNull();
				expect(Array.isArray(resultat)).toBe(true);
				expect(resultat.length).toBeGreaterThan(0);
				expect(resultat[0]).toHaveProperty("nom");
				expect(resultat[0]).toHaveProperty("prenom");
				done();
			} catch (error) {
				done(error);
			}
		}

		model.readall(cbReadAll);
	});

    test("areValid doit appeler le callback avec erreur si la requête échoue", (done) => {
		// Simuler une erreur SQL
		DB.query.mockImplementation((sql, values, callback) => {
			callback(new Error("Erreur SQL"), null);  // Simuler une erreur SQL
		});

		// Tester la méthode areValid avec un callback pour gérer l'erreur
		model.areValid("22", "password123", (err, result) => {
			expect(err).toBeInstanceOf(Error); // Vérifier que l'erreur est passée au callback
			expect(err.message).toBe("Erreur SQL"); // Vérifier que le message d'erreur est correct
			expect(result).toBeNull(); // Résultat nul en cas d'erreur
			done(); // Signal que le test est terminé
		});
	});

	test("areValid doit appeler le callback avec true si l'id et le mot de passe sont valides", (done) => {
		// Simuler une requête réussie avec un mot de passe valide
		DB.query.mockImplementation((sql, values, callback) => {
			callback(null, [{ pwd: "password123" }]);  // Simulation d'une réponse valide avec un mot de passe correct
		});

		model.areValid("22", "password123", (err, result) => {
			expect(err).toBeNull(); // Pas d'erreur
			expect(result).toBe(true); // Le mot de passe est valide, donc on s'attend à true
			done();
		});
	});

	test("areValid doit appeler le callback avec false si l'id ou le mot de passe est invalide", (done) => {
		// Simuler une requête réussie avec un mot de passe invalide
		DB.query.mockImplementation((sql, values, callback) => {
			callback(null, [{ pwd: "wrongpassword" }]);  // Simulation d'une réponse valide mais avec un mot de passe incorrect
		});

		model.areValid("22", "password123", (err, result) => {
			expect(err).toBeNull(); // Pas d'erreur
			expect(result).toBe(false); // Le mot de passe est invalide, donc on s'attend à false
			done();
		});
	});

    test("create user échoue si requête échoue", (done) => {
	  // Utilisation de mockImplementation pour simuler une erreur SQL
	  DB.query.mockImplementation((sql, values, callback) => {
		callback(new Error("Erreur SQL"), null); // Simulation d'une erreur SQL
	  });

	  function cbcreate(err, resultat) {
		try {
		  expect(err).toBeInstanceOf(Error); // Vérifie que l'erreur est une instance d'Error
		  expect(err.message).toBe("Erreur SQL"); // Vérifie le message de l'erreur
		  done(); // Le test est terminé, on appelle done pour indiquer à Jest que le test est fini
		} catch (e) {
		  done(new Error("Échec de l'insertion de l'utilisateur : " + e.message)); // Si le test échoue, on appelle done avec l'erreur
		}
	  }

	  // Appel de model.create avec les paramètres de test
	  model.create("005", "fillion", "francois", "npmstart", "45454545", "02-02-2025", "actif", cbcreate);
	});

    
});
