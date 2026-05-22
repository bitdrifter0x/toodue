import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {createTask, getTasks, deleteTask, updateTask} from '../controllers/taskController.js'

const taskRouter = express.Router()

taskRouter.get('/', protect, getTasks)
taskRouter.post('/', protect, createTask)
taskRouter.put('/:id', protect, updateTask)
taskRouter.delete('/:id', protect, deleteTask)


export default taskRouter