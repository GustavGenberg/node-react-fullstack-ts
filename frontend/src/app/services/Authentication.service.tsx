import { ApiService } from './Api.service';
import { EventEmitter } from 'events';
import { AlertService } from './Alert.service';
import { CookieService } from './Cookie.service';

export enum AuthenticationStates {
     PENDING,
     VALID,
     INVALID
}

export const AuthenticationService = new class AuthenticationService extends EventEmitter {

     public static PENDING: AuthenticationStates = AuthenticationStates.PENDING;
     public static VALID: AuthenticationStates = AuthenticationStates.VALID;
     public static INVALID: AuthenticationStates = AuthenticationStates.INVALID;

     public state: AuthenticationStates = AuthenticationStates.PENDING;

     constructor() {
          super();

          ApiService.get('/session').then(response => {
               if (response.error) {
                    AlertService.danger(response.message);
                    this.state = AuthenticationStates.INVALID;
               } else {
                    this.state = AuthenticationStates.VALID;
               }

               this.emit('change', this.state);
          })
     }

     public authenticate(username: string, password: string) {
          this.state = AuthenticationStates.PENDING;
          this.emit('change', this.state);

          return new Promise((resolve, reject) => {
               ApiService.post('/session', {
                    username,
                    password
               }).then(response => {
                    if (response.error) {
                         this.state = AuthenticationStates.INVALID;
                         AlertService.danger(response.message);
                    } else {
                         CookieService.set('Token', response.token, 60);
                         this.state = AuthenticationStates.VALID;
                         AlertService.success(response.message);
                    }

                    this.emit('change', this.state);
                    resolve(response);
               })
          })
     }

     public deauthenticate() {
          ApiService.delete('/session').then(response => {
               if (response.error) {
                    AlertService.danger(response.message);
               } else {
                    AlertService.success(response.message);
                    this.state = AuthenticationStates.INVALID;
                    this.emit('change', this.state);
               }
          })
     }

}