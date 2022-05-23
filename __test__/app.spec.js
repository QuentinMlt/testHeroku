const {app, Taches} = require('../app');
const request = require('supertest');

afterEach(() => {
    Taches.memoryDb = new Map();
    Taches.id = 0;
});

describe('Task', () => {
    test.each([
        {description: "Description 1", faite: true},
        {description: "Description 2", faite: false},
        {description: "Description 3", faite: true}
    ])('Should pass confirmation data', async (objectTest) => {
        const result = await request(app).post('/task').send(objectTest).expect(201);
    });
    test('Should not find object', async () => {
        const result = await request(app).get('/task/136').send().expect(400);
    });
    test('Should find object', async () => {
        const sendData = await request(app).post('/task').send({description: "Hello World", faite: false}).expect(201);
        console.log(Taches.getAll());
        const result = await request(app).get('/task/0').send().expect(200);
    });
});

describe('Task Update', () => {
    test('Should update one entry', async () => {
        const result = await request(app).post('/task').send({description: "Desciption 1", faite: false}).expect(201);
        const modif = await request(app).put('/task/0').send({description: "Description1", faite: true}).expect(200);
        expect(modif.body.faite).toBe(true);
    });
});

describe('Task Delete', () => {
    test('Should delete one entry', async () => {
        const result = await request(app).post('/task').send({description: "Desciption 1", faite: false}).expect(201);
        const modif = await request(app).delete('/task/0').send({description: "Description1", faite: true}).expect(200);
        expect(Taches.memoryDb.entries.length).toBe(0);
    });
});

describe('Register & Login', () => {
    test.each([
        {email: "Jean@example.com", username: "Jean", password: "1234"},
        {email: "Lila@example.com", username: "Lila", password: "1234"},
        {email: "Fabien@example.com", username: "Fabien", password: "1234"},
    ])('Should register and login', async (objectTest) => {
        const register = await request(app).post('/register').send(objectTest).expect(201);
        //const login = await request(app).post('/login')
    });
});