import * as http from 'http';
import * as path from 'path';
import express from 'express';

import { Database } from './Database';
import { SessionRoute } from './routes/session';
import { TodosRoute } from './routes/todos';

export class Backend {

     private config: any;

     private app: express.Express = express();
     private server: http.Server = http.createServer(this.app);

     public database: Database = new Database();

     constructor(config: any) {
          this.config = config;

          this.server.listen(this.config.port, () => {
               console.log(`Listening on port ${(this.server.address() as any).port}`)
          })

          this.app.use(express.json());
          this.app.set('json spaces', '\t');

          this.bindRoutes();
     }

     public createRouter() {
          return express.Router({ mergeParams: true });
     }

     private bindRoutes() {
          this.app.use('/', express.static(path.join(__dirname, '../../frontend/build')));

          this.app.get('/api', (request: express.Request, response: express.Response) => {
               response.send({
                    name: 'node-react-fullstack-ts',
                    version: '0.1.0-beta'
               })
          })

          const api = this.createRouter();

          SessionRoute(api);
          TodosRoute(api);

          this.app.use('/api', api);
     }

}