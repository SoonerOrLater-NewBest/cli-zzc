import * as lowdb from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
export type Todo = {
    id: number;
    task: string;
    done: boolean;
};
type TodoSchema = {
  todos: Todo[];
};
const adapter = new FileSync<TodoSchema>('db.json')
const db = lowdb(adapter)
db.defaults({todos: []}).write()
const Todos = db.get('todos')
export {db, Todos}
