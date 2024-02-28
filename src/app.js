require('./database/config');
const express = require('express');
const routes = require('./routes/index');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/', routes);

// Handle request
app.use((req, res, next) => {
	const method = req.method;
	const querys = req.query;
	const params = req.params;
	const path = req.originalUrl;
	const currentDate = new Date(Date.now());

	console.log(`
	Today ${currentDate}, \n 
	Method: ${method} \n 
	path: ${path} \n
	`);

	if (Object.keys(querys).length) console.table(querys);

	next();
});

// errors
app.use((error, req, res, next) => {
	if (error.name == 'UnauthorizedError') {
		const { message } = error.inner;
		if (message == 'The token has been revoked.') {
			res.status(401).send('No tines permisos para ingresar');
		} else if (message == 'No authorization token was found') {
			res.status(401).send('El token es requerido');
		} else if (message == 'invalid signature') {
			res.status(401).send('Token incorrecto');
		}
	} else {
		res.status(500).send('Error en el servidor');
	}
});

module.exports = app;
