// src/interfaces/controllers/UserController.js

class UserController {
  constructor(getUserUseCase, createUserUseCase, updateUserUseCase, deleteUserUseCase) {
    this.getUserUseCase = getUserUseCase;
    this.createUserUseCase = createUserUseCase;
    this.updateUserUseCase = updateUserUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
  }
  
    async createUser(req, res) {
      try {
        const userData = req.body;
        const newUser = await this.createUserUseCase.execute(userData);
        res.status(201).json(newUser);
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  
    async getUser(req, res) {
      try {
        const userId = req.params.id;
        // Call the appropriate use case to fetch user by id
        const user = await this.getUserUseCase.execute(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  
    async updateUser(req, res) {
      try {
        const userId = req.params.id;
        const userData = req.body;
        // Call the appropriate use case to update user
        const updatedUser = await this.updateUserUseCase.execute(userId, userData);
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  
    async deleteUser(req, res) {
      try {
        const userId = req.params.id;
        // Call the appropriate use case to delete user
        await this.deleteUserUseCase.execute(userId);
        res.status(204).send();
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
  
  module.exports = UserController;
  