import * as React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { ApiService } from '../../../services/Api.service';
import { ExtendedButtonToolbar } from '../../extended/ExtendedButtonToolbar.component';
import { LoaderComponent } from '../../Loader.component';

interface IState {
     todo: any | null;
}

export class TodoComponent extends React.Component<any, IState> {

     private id: string;

     constructor(props: any) {
          super(props);

          this.id = this.props.match.params.id;

          this.state = {
               todo: this.id ? null : {
                    name: ''
               }
          }

          if (this.id) {
               ApiService.get(`/todos/${this.id}`)
                    .then(ApiService.catchError())
                    .then(response => {
                         this.setState({
                              todo: response.todo
                         })
                    })
          }
     }

     private save(event: any) {
          event.preventDefault();

          const { todo: virtualhost } = this.state;

          let endpoint;
          let request;

          if (this.id) {
               endpoint = `/todos/${this.id}`;
               request = ApiService.patch.bind(ApiService);
          } else {
               endpoint = '/todos';
               request = ApiService.post.bind(ApiService);
          }

          request(endpoint, virtualhost)
               .then(ApiService.catchError())
               .then(ApiService.alertResponse())
               .then(response => {
                    this.props.history.push('/todos');
               })
     }

     private delete() {
          ApiService.delete(`/todos/${this.id}`)
               .then(ApiService.catchError())
               .then(ApiService.alertResponse())
               .then(response => {
                    this.props.history.push('/todos');
               })
     }

     public render(): any {
          const { todo } = this.state;

          return (
               <>
                    <Form onSubmit={this.save.bind(this)}>
                         <ExtendedButtonToolbar>
                              <h3>Todo</h3>
                              {todo && <div>
                                   {this.id &&
                                        <Button variant="danger" onClick={this.delete.bind(this)}>Delete</Button>
                                   }

                                   <Button variant="primary" type="submit">Save</Button>
                              </div>}
                         </ExtendedButtonToolbar>

                         {todo ? <>
                              <Form.Group as={Row}>
                                   <Form.Label column>Name</Form.Label>
                                   <Col sm={10}>
                                        <Form.Control type="text" placeholder="Name" onChange={(event: any) => {
                                             event.persist();
                                             this.setState(state => {
                                                  state.todo.name = event.target.value;
                                                  return state;
                                             })
                                        }} defaultValue={todo.name} autoFocus required />
                                   </Col>
                              </Form.Group>
                         </> : <LoaderComponent />}
                    </Form>
               </>
          )
     }
}