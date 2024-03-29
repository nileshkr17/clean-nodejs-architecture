


# 🚀 Clean Node.js Architecture with MongoDB

To learn more about Clean Architecture in Node.js with MongoDB, I'll build more projects using this approach. I'll understand each layer and how they work together. I'll try different design patterns and techniques, read articles, watch tutorials, and join online communities. I'll keep practicing and exploring new ideas to improve my understanding.

## Project Structure

The project follows the Clean Architecture principles, with separate layers for domain logic, application logic, infrastructure, and interface adapters:

- **📁 src/**: Contains the source code of the application.
  - **📁 application/**: Contains use cases (application logic).
    - 📄 `CreateUser.js`: Defines the `CreateUser` use case class responsible for creating new users.
  - **📁 domain/**: Contains entities and domain logic.
    - 📄 `User.js`: Defines the `User` entity class representing user data.
  - **📁 infrastructure/**: Contains implementations of external concerns (e.g., database, external services).
    - 📄 `UserRepositoryMongoDB.js`: Implements the `UserRepository` interface using MongoDB for database operations.
  - **📁 interfaces/**: Contains controllers and other interface adapters (e.g., HTTP routes).
    - 📄 `UserController.js`: Defines the `UserController` class responsible for handling HTTP requests and responses related to users.
- **📁 tests/**: Contains unit tests, integration tests, and end-to-end tests for the application.
- **📄 index.js**: Entry point of the application.

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/yourusername/clean-nodejs-mongodb.git
```

2. Navigate to the project directory:

```bash
cd clean-nodejs-mongodb
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following line:

   ```
   MONGODB_URI=<your_mongodb_connection_uri>
   ```

   Replace `<your_mongodb_connection_uri>` with your actual MongoDB connection URI.

5. Start the server:

```bash
npm start
```

The server should now be running on http://localhost:3000.

## Security
- **Code explanation**:


Below is an example of the main `index.js` file, which sets up the Express server and includes various security measures:

```
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const bodyParser = require('body-parser');
const UserController = require('./src/interfaces/controllers/UserController');
const GetUser = require('./src/application/usecases/GetUser');
const CreateUser = require('./src/application/usecases/CreateUser');
const UpdateUser = require('./src/application/usecases/UpdateUser');
const DeleteUser = require('./src/application/usecases/DeleteUser');
const UserRepositoryMongoDB = require('./src/infrastructure/mongodb/UserRepositoryMongoDB');

const app = express();

// Set security headers with helmet
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(bodyParser.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
  whitelist: [
    'name'
  ]
}));

// Initialize repositories and use cases
const userRepository = new UserRepositoryMongoDB();
const getUserUseCase = new GetUser(userRepository);
const createUserUseCase = new CreateUser(userRepository);
const updateUserUseCase = new UpdateUser(userRepository);
const deleteUserUseCase = new DeleteUser(userRepository);

// Initialize controller with use cases
const userController = new UserController(getUserUseCase, createUserUseCase, updateUserUseCase, deleteUserUseCase);

// Routes
app.post('/users', userController.createUser.bind(userController));
app.get('/users/:id', userController.getUser.bind(userController));
app.put('/users/:id', userController.updateUser.bind(userController));
app.delete('/users/:id', userController.deleteUser.bind(userController));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```
Code Explanation:
Helmet: The helmet middleware is used to set various HTTP headers to secure the application against common security vulnerabilities.
Rate Limiting: The express-rate-limit middleware limits requests from the same API to prevent abuse and DoS attacks.
Body Parser: The body-parser middleware parses incoming request bodies and limits the size of JSON payloads to prevent DoS attacks.
Data Sanitization: The express-mongo-sanitize middleware sanitizes user-supplied data to prevent NoSQL injection attacks.
XSS Protection: The xss-clean middleware sanitizes user input to prevent cross-site scripting (XSS) attacks.
Parameter Pollution Prevention: The hpp middleware prevents HTTP parameter pollution attacks by whitelisting specific parameters.
This code block sets up various security middleware and initializes the application with routes and controllers. It demonstrates how to use these security measures to protect your Node.js application from common security vulnerabilities.

## Explanation

- **🎮 UserController**: This is the interface adapter responsible for handling HTTP requests and responses related to users. It delegates the business logic to the appropriate use cases in the application layer.

```javascript
// src/interfaces/controllers/UserController.js

class UserController {
  // Constructor and methods...
}
```

- **🔧 CreateUser**: This is a use case in the application layer responsible for creating a new user. It validates the user data, performs any necessary business logic, and calls the repository to persist the user in the database.

```javascript
// src/application/usecases/CreateUser.js

class CreateUser {
  // Constructor and execute method...
}
```

- **📝 UserRepositoryMongoDB**: This is an implementation of the `UserRepository` interface in the infrastructure layer using MongoDB. It handles database operations related to users, such as creating, retrieving, updating, and deleting users.

```javascript
// src/infrastructure/UserRepositoryMongoDB.js

class UserRepositoryMongoDB {
  // Constructor and repository methods...
}
```


