const request = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
	test("It should response the GET method", done => {
			request(app)
			.get("/")
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
		});
	});
});

describe("test de /liste_des_formulaires dans administrator", () => {
	test("It should response the GET method", done => {
			request(app)
			.get("/administrator/liste_des_formulaires")
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
		});
	});
});

describe("test de /liste_des_formulaires/:type/:etat dans administrator", () => {
	test("It should response the GET method", done => {
			request(app)
			.get("/administrator/liste_des_formulaires/:type/:etat")
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
		});
	});
});

describe("test de /liste_des_offres dans candidate", () => {
	test("It should response the GET method", done => {
			request(app)
			.get("/candidate/liste_des_offres")
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
		});
	});
});

describe("test de /liste_de_mes_candidatures/:monid dans candidate", () => {
	test("It should response the GET method", done => {
			request(app)
			.get("/candidate/liste_de_mes_candidatures/:monid")
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
		});
	});
});

describe("test de /post_files dans recruiter", () => {
	test("It should response the GET method", done => {
			request(app)
			.get('/recruiter/post_files')
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
		});
	});
});

describe("test de /delete_offer/:numero dans recruiter", () => {
	test("It should response the GET method", done => {
			request(app)
			.get('/recruiter/delete_offer/:numero')
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
		});
	});
});

describe("test de /delete_post_file/:numero dans recruiter", () => {
	test("It should response the GET method", done => {
			request(app)
			.get('/recruiter/delete_post_file/:numero')
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
		});
	});
});

describe("test de /create_post_file dans recruiter", () => {
	test("It should response the GET method", done => {
			request(app)
			.get('/recruiter/create_post_file')
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
		});
	});
});

describe("test de /userslist dans users", () => {
	test("It should response the GET method", done => {
			request(app)
			.get('/users/userslist')
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
		});
	});
});

describe("test de /toto dans users", () => {
	test("It should response the GET method", done => {
			request(app)
			.get('/users/toto')
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
		});
	});
});

describe("test de /add-user dans users", () => {
	test("It should response the GET method", done => {
			request(app)
			.get('/users/add-user')
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
		});
	});
});

