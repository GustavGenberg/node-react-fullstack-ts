import { TodosComponent } from './components/pages/todos/Todos.component';
import { TodoComponent } from './components/pages/todos/Todo.component';

export const Routes = [
     // /servers
     {
          path: '/todos',
          component: TodosComponent
     },
     {
          path: '/todos/add',
          component: TodoComponent
     },
     {
          path: '/todos/:id',
          component: TodoComponent
     }
]