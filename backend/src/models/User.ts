import * as mongoose from 'mongoose';

export const User = mongoose.model('users', new mongoose.Schema({
     username: String,
     password: String
}))