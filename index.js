const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('./src/interfaces/controllers/UserController');
const UserRepositoryMongoDB = require('./src/infrastructure/mongodb/UserRepositoryMongoDB');
const CreateUser = require('./src/application/usecases/CreateUser');
const UpdateUser = require('./src/application/usecasesUpdateUser')

const app= express();
app.use(bodyParser.json());

const userRepository = new UserRepositoryMongoDB();
const createUserUseCase = new CreateUser(userRepository);
const userController = new UserController(createUserUseCase);

app.post('/users', userController.createUser.bind(userController));



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})