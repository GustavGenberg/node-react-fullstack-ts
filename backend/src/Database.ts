import mongoose from 'mongoose';

export class Database {

     constructor() {
          mongoose.connect('mongodb://localhost/node-react-fullstack-ts', { useNewUrlParser: true });
          const connection = mongoose.connection;

          connection.on('error', (error: mongoose.Error) => {
               console.log('Error with connection to mongodb.');
          })

          connection.once('open', () => {
               console.log('Connected to mongodb.');
          })

          return connection;
     }

}