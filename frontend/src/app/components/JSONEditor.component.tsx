import * as React from 'react';
import JSONEditor from 'jsoneditor';

import 'jsoneditor/dist/jsoneditor.css';

export class JSONEditorComponent extends React.Component<any, never> {

     private jsoneditor: JSONEditor | any;

     public componentDidMount() {
          const { json, onChange, ...props } = this.props;

          const options: any = {
               mode: 'code',
               onChange: () => {
                    onChange(this.jsoneditor.getText())
               },
               ...props
          }

          this.jsoneditor = new JSONEditor(this.refs.container as HTMLElement, options);

          if (json) {
               this.jsoneditor.setText(json);
          }
     }

     public componentWillUnmount() {
          if (this.jsoneditor) {
               this.jsoneditor.destroy();
          }
     }

     public componentWillUpdate(nextProps: any) {
          this.jsoneditor.updateText(nextProps.json);
     }

     public render() {
          return (
               <div ref="container" />
          )
     }

}