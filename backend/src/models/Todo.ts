import * as mongoose from 'mongoose';

export const Todo = mongoose.model('todos', new mongoose.Schema({
     user: mongoose.Schema.Types.ObjectId,
     name: String
}))