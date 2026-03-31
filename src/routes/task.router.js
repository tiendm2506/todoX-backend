import express from 'express'
import { taskController } from '../controllers/task.controller.js'

const taskRouter = express.Router()

// Tạo route CRUD
taskRouter.post('/', taskController.create)
taskRouter.get('/', taskController.findAll)
taskRouter.get('/:id', taskController.findOne)
taskRouter.patch('/:id', taskController.update)
taskRouter.delete('/:id', taskController.remove)

export default taskRouter