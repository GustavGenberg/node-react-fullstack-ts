import * as React from 'react';
import { Form } from 'react-bootstrap';

interface IState {
     value: string;
}

export class FilterDropdownComponent extends React.Component<any, IState> {

     constructor(props: any) {
          super(props);

          this.state = {
               value: ''
          }
     }

     public render() {
          const { style, className, labeledBy } = this.props;
          const { value } = this.state;

          return (
               <div style={style} className={className} aria-labelledby={labeledBy}>
                    <Form.Control
                         autoFocus
                         className="mx-3 my-2 w-auto"
                         placeholder="Type to filter..."
                         onChange={(event: any) => {
                              this.setState({
                                   value: event.target.value
                              })
                         }}
                         value={value}
                    />
                    <ul className="list-unstyled">
                         {React.Children.toArray(this.props.children).filter((child: any) =>
                              !value || child.props.children.toLowerCase().startsWith(value)
                         )}
                    </ul>
               </div>
          )
     }

}