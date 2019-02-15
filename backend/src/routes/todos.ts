import * as express from 'express';
import { Todo } from '../models/Todo';
import { SessionStorage } from '../auth/SessionStorage';

export function TodosRoute(router: express.Router) {
     router.route('/todos')
          .get(async (request: express.Request, response: express.Response) => {
               const token = request.headers.token as string;

               try {
                    const results = await Todo.find({
                         user: SessionStorage.get(token)._id
                    })

                    response.send({
                         error: false,
                         message: 'Successfully retrieved todos.',
                         todos: results
                    })
               } catch (e) {
                    response.send({
                         error: true,
                         message: 'Could not retrieve todos.'
                    })
               }
          })
          .post(async (request: express.Request, response: express.Response) => {
               const user = SessionStorage.get(request.headers.token as string);

               const { name } = request.body;

               try {
                    const document = await new Todo({
                         user: user._id,
                         name
                    }).save();

                    response.send({
                         error: false,
                         message: 'Successfully created todo.',
                         todo: document
                    })
               } catch (e) {
                    response.send({
                         error: true,
                         message: 'Could not create todo.'
                    })
               }
          })

     router.route('/todos/:id')
          .get(async (request: express.Request, response: express.Response) => {
               const { id } = request.params;

               try {
                    const result = await Todo.findOne({
                         _id: id
                    })

                    response.send({
                         error: false,
                         message: 'Successfully retrieved todo.',
                         todo: result
                    })
               } catch (e) {
                    response.send({
                         error: true,
                         message: 'Failed to retrieve todo.'
                    })
               }
          })
          .patch(async (request: express.Request, response: express.Response) => {
               const { id } = request.params;

               const { name } = request.body;

               try {
                    const result = await Todo.updateOne({
                         _id: id
                    }, {
                              name
                         })

                    response.send({
                         error: false,
                         message: 'Successfully updated todo.',
                         todo: result
                    })
               } catch (e) {
                    response.send({
                         error: true,
                         message: 'Failed to update todo.'
                    })
               }
          })
          .delete(async (request: express.Request, response: express.Response) => {
               const { id } = request.params;

               try {
                    await Todo.deleteOne({
                         _id: id
                    })

                    response.send({
                         error: false,
                         message: 'Successfully deleted todo.',
                    })
               } catch (e) {
                    response.send({
                         error: true,
                         message: 'Failed to delete todo.'
                    })
               }
          })
}