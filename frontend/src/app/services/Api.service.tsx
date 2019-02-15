import { CookieService } from './Cookie.service';
import { AlertService } from './Alert.service';

export const ApiService = new class ApiService {

     private API_URI: string = '/api';

     public catchError(callback?: Function) {
          return (response: any) => {
               return new Promise((resolve: (response: any) => any) => {
                    if (response.error) {
                         AlertService.danger(response.message);

                         if (callback) {
                              callback();
                         }

                         return;
                    }

                    resolve(response);
               })
          }
     }

     public alertResponse() {
          return (response: any) => {
               if (response.error) {
                    AlertService.danger(response.message);
               } else {
                    AlertService.success(response.message);
               }

               return response;
          }
     }

     private request(method: string, endpoint: string, payload?: any) {
          const options: any = {
               method,
               headers: {
                    'Token': CookieService.has('Token') ? CookieService.get('Token') : null,
                    'Content-Type': 'application/json'
               },
               body: payload ? JSON.stringify(payload) : null
          }

          return new Promise((resolve: (response: any) => any) => {
               fetch(this.API_URI + endpoint, options)
                    .then(response => response.text())
                    .then((response: any) => {
                         try {
                              const parsed = JSON.parse(response);
                              resolve(parsed);
                         } catch (e) {
                              resolve({
                                   error: true,
                                   message: e.message
                              })
                         }
                    })
          })
     }

     public post(endpoint: string, payload: any) { // create
          return this.request('POST', endpoint, payload);
     }

     public get(endpoint: string) { // list
          return this.request('GET', endpoint);
     }

     public put(endpoint: string, payload: any) {
          return this.request('PUT', endpoint, payload);
     }

     public patch(endpoint: string, payload: any) {
          return this.request('PATCH', endpoint, payload);
     }

     public delete(endpoint: string) {
          return this.request('DELETE', endpoint);
     }

}