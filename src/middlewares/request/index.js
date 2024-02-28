const { checkSchema } = require('express-validator');

const authenticationRequestMiddleware = async (req, res, next) => {
	try {
		const validationSchema = await checkSchema(
			{
				email: {
					isEmail: {
						errorMessage: 'Email format is incorrect',
					},
					notEmpty: {
						errorMessage: 'Field required',
					},
				},
				password: {
					notEmpty: {
						errorMessage: 'Field required',
					},
				},
			},
			['body']
		).run(req);

		if (validationSchema.length) {
			const validations = {};
			validationSchema.forEach((errorSchema) => {
				const errors = errorSchema.errors;
				if (errors.length) {
					errors.forEach((error) => {
						const key = error.path;
						const msg = error.msg;
						const value = error.value;

						switch (key) {
							case 'email':
								if (Array.isArray(validations[key])) {
									validations[key] = [
										...validations[key],
										{
											value,
											msg,
										},
									];
								} else {
									validations[key] = [
										{
											value,
											msg,
										},
									];
								}
								break;
							case 'password':
								validations[key] = [
									{
										value,
										msg,
									},
								];

								break;
							default:
								break;
						}
					});
				}
			});

			if (Object.keys(validations).length) {
				res.status(400).send({
					status: 'Bad Request',
					errors: validations,
				});
			} else {
				next();
			}
		}
	} catch (error) {
		res.status(500).send({
			status: 'Server error',
			msg: error,
		});
	}
};

const registerUserRequestMiddleware = async (req, res, next) => {
	try {
		const validationSchema = await checkSchema(
			{
				name: {
					notEmpty: {
						errorMessage: 'Field required',
					},
				},
				email: {
					isEmail: {
						errorMessage: 'Email format is incorrect',
					},
					notEmpty: {
						errorMessage: 'Field required',
					},
				},
				password: {
					notEmpty: {
						errorMessage: 'Field required',
					},

					matches: {
						options:
							/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
						errorMessage:
							'The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character from the following: @$!%*?&',
					},
				},
				passwordRepeat: {
					notEmpty: {
						errorMessage: 'Field required',
					},
				},
				role: {
					optional: true,
					isIn: {
						options: ['admin', 'user'],
						errorMessage:
							'Only one of these values are available: "admin" or "user"',
					},
				},
			},
			['body']
		).run(req);

		if (validationSchema.length) {
			const validations = {};
			validationSchema.forEach((errorSchema) => {
				const errors = errorSchema.errors;

				if (errors.length) {
					errors.forEach((error) => {
						const key = error.path;
						const msg = error.msg;
						const value = error.value;

						switch (key) {
							case 'email':
								if (Array.isArray(validations[key])) {
									validations[key] = [
										...validations[key],
										{
											value,
											msg,
										},
									];
								} else {
									validations[key] = [
										{
											value,
											msg,
										},
									];
								}
								break;
							case 'password':
								if (Array.isArray(validations[key])) {
									validations[key] = [
										...validations[key],
										{
											value,
											msg,
										},
									];
								} else {
									validations[key] = [
										{
											value,
											msg,
										},
									];
								}
								break;
							case 'passwordRepeat':
								validations[key] = [
									{
										value,
										msg,
									},
								];

								break;
							case 'name':
								validations[key] = [
									{
										value,
										msg,
									},
								];

								break;
							default:
								break;
						}
					});
				}
			});

			if (Object.keys(validations).length) {
				res.status(400).send({
					status: 'Bad Request',
					errors: validations,
				});
			} else {
				next();
			}
		}
	} catch (error) {
		res.status(500).send({
			status: 'Server error',
			msg: error,
		});
	}
};

module.exports = {
	authenticationRequestMiddleware,
	registerUserRequestMiddleware,
};
