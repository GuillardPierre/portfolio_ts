const projectController = {
	snake(req, res) {
		res.render('snake');
	},

	meteo(req, res) {
		res.render('meteo');
	},

	pokemon(req, res) {
		res.render('pokemon');
	},

	department(req, res) {
		res.render('departmentKing');
	},

	pendu(req, res) {
		res.render('pendu');
	},

	pfc(req, res) {
		res.render('PFC');
	},

	chat(req, res) {
		res.render('chat');
	},
};

export default projectController;
