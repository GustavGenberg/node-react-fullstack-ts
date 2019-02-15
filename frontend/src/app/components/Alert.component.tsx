import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { AlertService } from '../services/Alert.service';

interface IState {
     alerts: any[];
}

export class AlertComponent extends React.Component<any, IState> {

     private alertServiceListener: any;

     constructor(props: any) {
          super(props);

          this.state = {
               alerts: AlertService.alerts
          }

          AlertService.on('update', this.alertServiceListener = ((alerts: any) => {
               this.setState({
                    alerts
               })
          }))
     }

     public componentWillUnmount() {
          AlertService.off('update', this.alertServiceListener);
     }

     public render(): any {
          const { alerts } = this.state;

          return alerts.map((alert, index: number) => (
               <Alert key={index} variant={alert.variant}>
                    {alert.message}
               </Alert>
          ))
     }

}