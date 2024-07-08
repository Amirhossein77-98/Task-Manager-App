import express, { Request, Response } from 'express';
import {json} from 'body-parser';
import { UserController } from './controllers/userController';
import { TaskController } from './controllers/taskController';


const app = express();
const port = 3000;

// Middlewares
app.use(json())
app.use(express.static('public'))

// Routes
app.get('/index', TaskController.readTasks);
app.post('/taskDetails', TaskController.fetchUserTaskById)
app.post('/taskUpdate', TaskController.updateTask)
app.post('/register', UserController.register);
app.post('/login', UserController.login);
app.post('/newTask', TaskController.newTask)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})