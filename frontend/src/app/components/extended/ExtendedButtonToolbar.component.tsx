import * as React from 'react';
import { ButtonToolbar } from 'react-bootstrap';

export const ExtendedButtonToolbar = (props: any) => {
     return (
          <ButtonToolbar className="justify-content-between my-4 extended-button-toolbar" {...props}>
               {props.children}
          </ButtonToolbar>
     )
}