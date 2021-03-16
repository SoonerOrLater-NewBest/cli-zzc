import fetch from 'node-fetch';

export interface Task {
    id: string;
    owner: string;
    title: string;
    taskName: string;
    avatar: string;
    cover: string;
    status: number;
    percent: number;
    logo: string;
    href: string;
    body?: any;
    updatedAt: number;
    createdAt: number;
    subDescription: string;
    description: string;
    activeUser: number;
    newUser: number;
    star: number;
    like: number;
    message: number;
    content: string;
}
export interface Result {
    data: {
        list: Task[];
        total: number;
    };
    status: number;
}
export class TaskService {
    static getTaskList(): Result {
        // const todos = await Todos.sortBy('id').value()
        return fetch('http://localhost:8888/api/tasks').then((res) => res.json());
    }
}
