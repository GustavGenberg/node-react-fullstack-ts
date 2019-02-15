import * as React from 'react';
import { AuthenticationService, AuthenticationStates } from '../services/Authentication.service';
import { LoaderComponent } from './Loader.component';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { AlertComponent } from './Alert.component';

interface IState {
     inputs: { username: string; password: string; };
     authenticationState: AuthenticationStates;
}

export class AuthenticationComponent extends React.Component<any, IState> {

     constructor(props: any) {
          super(props);

          this.state = {
               inputs: {
                    username: '',
                    password: ''
               },
               authenticationState: AuthenticationService.state
          }

          AuthenticationService.on('change', (state: AuthenticationStates) => {
               this.setState({
                    authenticationState: state
               })
          })
     }

     public login(event: any) {
          const { username, password } = this.state.inputs;

          this.setState(state => {
               state.inputs.password = '';
               return state;
          })

          AuthenticationService.authenticate(username, password).then((response: any) => {
               this.setState(state => {
                    if (!response.error) {
                         state.inputs.username = '';
                    }

                    state.inputs.password = '';

                    return state;
               })
          })

          event.preventDefault();
     }

     public render(): any {
          const { authenticationState } = this.state;
          const { username, password } = this.state.inputs;

          return authenticationState == AuthenticationStates.PENDING ? (
               <LoaderComponent />
          ) : authenticationState === AuthenticationStates.VALID ? this.props.children : (
               <Container className="mt-5">
                    <Row>
                         <Col md={{ span: 4, offset: 4 }}>
                              <Form onSubmit={this.login.bind(this)}>
                                   <h2>node-react-fullstack-ts</h2>

                                   <AlertComponent />

                                   <Form.Group>
                                        <Form.Control type="text" value={username} onChange={(event: any) => {
                                             event.persist();
                                             this.setState(state => {
                                                  state.inputs.username = event.target.value;
                                                  return state;
                                             })
                                        }} placeholder="Username" autoFocus={true} />
                                   </Form.Group>
                                   <Form.Group>
                                        <Form.Control type="password" value={password} onChange={(event: any) => {
                                             event.persist();
                                             this.setState(state => {
                                                  state.inputs.password = event.target.value;
                                                  return state;
                                             })
                                        }} placeholder="Password" />
                                   </Form.Group>

                                   <Button variant="primary" type="submit">Login</Button>
                              </Form>
                         </Col>
                    </Row>
               </Container>
          )
     }

}