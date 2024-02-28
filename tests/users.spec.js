const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');

describe('CRUD', () => {
	// setence #1

	beforeEach(async () => {
		db.query('DELETE from students');
	});

	it('Obtener usuarios', async () => {
		const { statusCode, body: users } = await request(app).get('/users');
		// console.log(users);

		expect(statusCode).toBe(201);
		expect(users).toBeInstanceOf(Object);
		expect(users.data.length).toBeGreaterThanOrEqual(1);
	});

	it('Eliminar usuario no existe', async () => {
		const token = jwt.sign({ id: 5, email: 'user@user.com' }, 'secret_key');
		const userToDelete = 6;

		const { statusCode, body: response } = await request(app)
			.delete(`/users/${userToDelete}`)
			.set('Authorization', token);

		expect(statusCode).toBe(404);
		expect(response).toEqual({
			status: 'Bad Request',
			msg: 'User not found',
		});
	});

	it('Add user', async () => {
		const id = Math.floor(Math.random() * 99);

		const newUser = {
			id: id,
			email: 'pepito3@gmail.com',
			password: 'AsdD@123',
			rol: 'frontend',
			lenguage: 'javascript',
		};

		const { body: users, statusCode } = await request(app)
			.post('/users')
			.send(newUser);

		// console.log(bo);
		expect(statusCode).toBe(300);
		expect(users).toContainEqual(newUser);
	});
});
