import * as React from 'react';
import { Button, Alert, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ApiService } from '../../../services/Api.service';
import { ExtendedButtonToolbar } from '../../extended/ExtendedButtonToolbar.component';
import { LoaderComponent } from '../../Loader.component';

interface IState {
     todos: any[] | null;
}

export class TodosComponent extends React.Component<any, IState> {
     constructor(props: any) {
          super(props);

          this.state = {
               todos: null
          }

          ApiService.get('/todos')
               .then(ApiService.catchError())
               .then(response => {
                    this.setState({
                         todos: response.todos
                    })
               })
     }

     public render(): any {
          const { todos } = this.state;

          return (
               <>
                    <ExtendedButtonToolbar>
                         <h3>Todos</h3>
                         <Button variant="primary" as={Link} to="/todos/add">Add</Button>
                    </ExtendedButtonToolbar>

                    {todos ? todos.length ? <Table>
                         <thead>
                              <tr className="d-flex">
                                   <th className="flex-grow-1">Name</th>
                                   <th></th>
                              </tr>
                         </thead>
                         <tbody>
                              {todos.map((todo: any, index: number) => (
                                   <tr key={index} className="d-flex">
                                        <td className="flex-grow-1">{todo.name}</td>
                                        <td>
                                             <Button variant="primary" as={Link} to={`/todos/${todo._id}`}>Edit</Button>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </Table> : <Alert variant="info">No data.</Alert> : <LoaderComponent />}
               </>
          )
     }
}