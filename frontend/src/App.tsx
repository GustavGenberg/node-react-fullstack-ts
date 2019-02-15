import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom';

import { Routes } from './app/Routes';
import { AuthenticationComponent } from './app/components/Authentication.component';
import { AlertComponent } from './app/components/Alert.component';
import { AuthenticationService } from './app/services/Authentication.service';

import './App.sass';

class App extends Component {
     render() {
          return (
               <div className="app">
                    <Router>
                         <AuthenticationComponent>
                              <Navbar bg="light" expand="lg" className="mb-4">
                                   <Navbar.Brand as={Link} to="/">node-react-fullstack-ts</Navbar.Brand>
                                   <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                   <Navbar.Collapse>
                                        <Nav className="mr-auto">
                                             <Nav.Link as={Link} to="/todos">Todos</Nav.Link>

                                             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                                  <NavDropdown.Item as={Link} to="/page-1">Page 1</NavDropdown.Item>
                                                  <NavDropdown.Divider />
                                                  <NavDropdown.Item as={Link} to="/page-2">Page 2</NavDropdown.Item>
                                             </NavDropdown>
                                        </Nav>
                                        <Navbar.Text>
                                             <a href="#" onClick={(event) => {
                                                  AuthenticationService.deauthenticate();
                                                  event.preventDefault();
                                             }}>Log out</a>
                                        </Navbar.Text>
                                   </Navbar.Collapse>
                              </Navbar>
                              <Container className="mt-4">
                                   <AlertComponent />
                                   <Switch>
                                        <Route path='/' exact={true} render={() => (
                                             <Redirect to="/todos" />
                                        )} />

                                        {Routes.map((route, index: number) => (
                                             <Route key={index} path={route.path} exact={true} component={route.component} />
                                        ))}

                                        <Route render={() => (
                                             <h2>Page not found</h2>
                                        )} />
                                   </Switch>
                              </Container>
                         </AuthenticationComponent>
                    </Router>
               </div>
          );
     }
}

export default App;
