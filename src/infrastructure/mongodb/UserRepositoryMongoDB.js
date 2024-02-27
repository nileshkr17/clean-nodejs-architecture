const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect('process.env.MONGODB_URL',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const UserSchema = new mongoose.Schema({
    username: String,
    email:String
});

const UserModel = mongoose.model('User',UserSchema);

class UserRepositoryMongoDB{
    async create(userData){
        const user = await UserModel.create(userData);
        return user;
    }

    async findById(userId){
        const user = await UserModel.findById(userId);
        return user;
    }
    async findAll(){
        const users = await UserModel.find();
        return users;
    }
    async update(userId, userData) {
        const user = await UserModel.findByIdAndUpdate(userId, userData, { new: true });
        return user;
      }
    async delete(userId) {
        await UserModel.findByIdAndDelete(userId);
      }
}

module.exports = UserRepositoryMongoDB;