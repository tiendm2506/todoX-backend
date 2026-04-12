import express from 'express'
import { taskController } from '@/controllers/task.controller.js'
import { protect } from '@/common/middlewares/protect.middleware.js'

const taskRouter = express.Router()

taskRouter.post('/create', taskController.createNew)
taskRouter.get('/list', protect, taskController.getList)
taskRouter.put('/update/:id', taskController.update)
taskRouter.delete('/remove/:id', taskController.remove)

export default taskRouter