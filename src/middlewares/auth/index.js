require('dotenv');
const db = require('../../database/config');
const { expressjwt } = require('express-jwt');

const authorizationAdminMiddleware = (req, res, next) => {
	const secret = process.env.JWT_SECRET || 'secret';
	expressjwt({
		secret,
		algorithms: ['HS256'],
		isRevoked: (_, token) => (token.payload.role === 'admin' ? false : true),
	}).unless({
		path: [
			{
				url: /\/users(.*)/,
				methods: ['GET', 'OPTIONS'],
			},
		],
	})(req, res, next);
};

const authenticationMiddleware = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const userExist = await db.query('SELECT * FROM users WHERE email = $1', [
			email,
		]);

		if (userExist.rowCount) {
			req.user = {
				password,
				passwordHash: userExist.rows[0].password,
				user: userExist.rows[0],
			};
			next();
		} else {
			res.status(404).send({
				status: 'Not Found',
				msg: 'User does not exist',
			});
		}
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	authorizationAdminMiddleware,
	authenticationMiddleware,
};
