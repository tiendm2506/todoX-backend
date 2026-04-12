import express from 'express'
import swaggerUi from 'swagger-ui-express'
import taskRouter from '@/routes/task.router.js'
import userRouter from './user.router.js'
import swaggerDocument from '@/common/swagger/init.swagger.js'

const rootRouter = express.Router()

rootRouter.use('/api-docs', swaggerUi.serve)
rootRouter.get('/api-docs', swaggerUi.setup(swaggerDocument, { swaggerOptions: { persistAuthorization: true } }))

rootRouter.use('/api/tasks', taskRouter)
rootRouter.use('/api/user', userRouter)

export default rootRouter