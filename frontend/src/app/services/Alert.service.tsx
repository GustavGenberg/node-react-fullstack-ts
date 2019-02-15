import { EventEmitter } from 'events';

export const AlertService = new class AlertService extends EventEmitter {

     public alerts: any[] = [];

     private alert(variant: string, message: string) {
          const alert = {
               variant,
               message
          }

          console.log(alert);

          this.alerts.push(alert);
          this.emit('update', this.alerts);

          setTimeout(() => {
               this.alerts.shift();
               this.emit('update', this.alerts);
          }, 4000)
     }

     public primary(message: string) {
          this.alert('primary', message);
     }

     public success(message: string) {
          this.alert('success', message);
     }

     public danger(message: string) {
          this.alert('danger', message);
     }

     public warning(message: string) {
          this.alert('warning', message);
     }

     public info(message: string) {
          this.alert('info', message);
     }

}