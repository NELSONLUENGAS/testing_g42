// const db = require('../database/config');
// const { checkSchema } = require('express-validator');

// const handleGetMiddleware = async (req, res, next) => {
// 	try {
// 		const validationSchema = await checkSchema(
// 			{
// 				limits: {
// 					isNumeric: {
// 						errorMessage: 'Debe ser Numerico',
// 					},
// 					isInt: {
// 						options: {
// 							min: 0,
// 						},
// 						errorMessage: 'Debe ser Entero Positivo',
// 					},
// 					// custom: {
// 					// 	options: (value) => (value < 0 ? false : true),
// 					// 	bail: true,
// 					// 	errorMessage: 'Debe ser Entero Positivo',
// 					// },
// 				},
// 			},
// 			['query']
// 		).run(req);

// 		if (validationSchema.length) {
// 			const errors = validationSchema[0].errors;
// 			if (errors.length) {
// 				const validations = {};
// 				errors.forEach((error) => {
// 					const key = error.path;
// 					const msg = error.msg;
// 					const value = error.value;
// 					switch (key) {
// 						case 'limits':
// 							if (Array.isArray(validations['limits'])) {
// 								validations['limits'] = [
// 									...validations['limits'],
// 									{
// 										value,
// 										msg,
// 									},
// 								];
// 							} else {
// 								validations['limits'] = [
// 									{
// 										value,
// 										msg,
// 									},
// 								];
// 							}
// 							break;
// 						default:
// 							break;
// 					}
// 				});
// 				res.status(400).send({
// 					status: 'Bad Request',
// 					data: validations,
// 				});
// 			} else {
// 				next();
// 			}
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).send({
// 			status: 'Server error',
// 			msg: error,
// 		});
// 	}
// };

// module.exports = {
// 	handleGetMiddleware,
// };
