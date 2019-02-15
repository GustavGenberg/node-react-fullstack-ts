import * as React from 'react';
import { Card } from 'react-bootstrap';

interface IState {
     messages: any[];
}

export class ConsoleComponent extends React.Component<any, IState> {

     constructor(props: any) {
          super(props);

          this.state = {
               messages: []
          }
     }

     public componentDidMount() {
          this.log('Initialized web console');
     }

     public log(text: string, color?: string) {
          this.setState({
               messages: [...this.state.messages, {
                    color,
                    text: `${new Date().toUTCString().split(' ')[4]} ${text}`
               }]
          })
     }

     public error(message: string) {
          this.log(message, 'red');
     }

     public debug(message: string) {
          this.log(message, 'blue');
     }

     public render(): any {
          const { messages } = this.state;

          return (
               <Card className="console">
                    <Card.Body>
                         {messages.map((message, index: number) => (
                              <p key={index} style={{ color: message.color }}>{message.text}</p>
                         ))}
                    </Card.Body>
               </Card>
          )
     }

}