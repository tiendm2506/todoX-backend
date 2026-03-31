import taskRouter from '~/routes/task.router.js'
import express from 'express'

const rootRouter = express.Router()

rootRouter.use('/api/tasks', taskRouter)

export default rootRouter