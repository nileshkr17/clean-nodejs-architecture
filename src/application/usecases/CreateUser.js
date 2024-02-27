// src/application/usecases/CreateUser.js

class CreateUser {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute(userData) {
      try {
        // Validate user data (e.g., check if required fields are present)
        if (!userData.username || !userData.email) {
          throw new Error('Username and email are required');
        }
  
        // Business logic (if any)
  
        // Call the repository to create a new user
        const newUser = await this.userRepository.create(userData);
        return newUser;
      } catch (error) {
        // Handle any errors
        throw new Error(`Failed to create user: ${error.message}`);
      }
    }
  }
  
  module.exports = CreateUser;
  