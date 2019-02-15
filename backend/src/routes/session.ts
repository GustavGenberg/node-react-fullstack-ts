import * as express from 'express';

import { SessionStorage } from '../auth/SessionStorage';
import { User } from '../models/User';

function validatePassword(password: string, hash: string) {
     return password === hash;
}

export function SessionRoute(router: express.Router) {
     router.route('/session')
          .get((request: express.Request, response: express.Response) => {
               const token = request.headers.token as string;

               if (!SessionStorage.exists(token)) {
                    response.send({
                         error: true,
                         message: 'Invalid session token.'
                    })

                    return;
               }

               response.send({
                    error: false,
                    message: 'Valid session token.'
               })
          })
          .post((request: express.Request, response: express.Response) => {
               const { username, password } = request.body;

               User.findOne({
                    username
               }).then((user: any) => {
                    if (!user || !validatePassword(password, user.password)) {
                         response.send({
                              error: true,
                              message: 'Invalid username or password.'
                         })

                         return;
                    }

                    const token = SessionStorage.create(user);

                    response.send({
                         error: false,
                         message: 'Successfully created token.',
                         token
                    })
               })
          })
          .delete((request: express.Request, response: express.Response) => {
               const token = request.headers.token as string;

               SessionStorage.destroy(token);

               response.send({
                    error: false,
                    message: 'Session was destroyed.'
               })
          })

     router.use('/', (request: express.Request, response: express.Response, next: express.NextFunction) => {
          const token = request.headers.token as string;

          if (!SessionStorage.exists(token)) {
               response.send({
                    error: true,
                    message: 'Invalid session token.'
               })

               return;
          }

          next();
     })
}