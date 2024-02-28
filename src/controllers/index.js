require('dotenv');
const jwt = require('jsonwebtoken');
const { compare } = require('bcrypt');

const authenticationController = async (req, res, next) => {
	try {
		const { password, passwordHash, user } = req.user;

		const match = await compare(password, passwordHash);

		if (match) {
			console.log(match);
			const token = jwt.sign(
				{ userID: user.id, role: user.role },
				process.env.JWT_SECRET,
				{
					expiresIn: 30 * 60,
					algorithm: 'HS256',
				}
			);
			console.log(token);
		} else {
			console.log(match, 'no matches');
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	authenticationController,
};
