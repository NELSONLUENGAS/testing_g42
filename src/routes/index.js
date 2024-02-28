const router = require('express').Router();
const db = require('../database/config');

const { authenticationController } = require('../controllers');
const { authenticationMiddleware } = require('../middlewares/auth');
const {
	authenticationRequestMiddleware,
	registerUserRequestMiddleware,
} = require('../middlewares/request');

router.post(
	'/login',
	authenticationRequestMiddleware,
	authenticationMiddleware,
	authenticationController
);

router.post('/register', registerUserRequestMiddleware, (req, res) =>
	console.log(req)
);

router.get('/users', async (req, res, next) => {
	try {
		const users = await db.query('SELECT * FROM students');
		if (users.rowCount) {
			res.status(201).send({
				status: 'Success',
				data: users.rows,
			});
		}
	} catch (error) {}
});

router.delete('/users/:id', async (req, res, next) => {
	try {
		const { id } = req.params;

		const users = await db.query('SELECT * FROM students WHERE id=$1', [id]);
		if (users.rowCount) {
			// Elinar
			res.status(200).send({
				status: 'Success',
				data: users.rows,
			});
		} else {
			res.status(404).send({
				status: 'Bad Request',
				msg: 'User not found',
			});
		}
	} catch (error) {}
});

router.post('/users', async (req, res, next) => {
	try {
		const { id, email, rol, lenguage, password } = req.body;

		const user = await db.query(
			'INSERT into students values($1, $2, $3, $4, $5) RETURNING *',
			[id, email, password, rol, lenguage]
		);

		if (user.rowCount) {
			// Elinar
			res.status(300).send(user.rows);
		} else {
			res.status(404).send({
				status: 'Bad Request',
				msg: 'User not found',
			});
		}
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;
