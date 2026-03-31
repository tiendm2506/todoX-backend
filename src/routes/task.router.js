import express from 'express'
import { taskController } from '~/controllers/task.controller.js'

const taskRouter = express.Router()

taskRouter.post('/create', taskController.createNew)
taskRouter.get('/list', taskController.getList)
taskRouter.put('/update/:id', taskController.update)
taskRouter.delete('/remove/:id', taskController.remove)

export default taskRouter