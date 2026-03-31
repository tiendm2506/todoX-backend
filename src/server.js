/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import taskRouter from './routes/task.router.js'
import { CONNECT_DB, CLOSE_DB } from './config/db.js'
import { env } from './config/environment.js'

import dns from 'node:dns/promises'
dns.setServers(['1.1.1.1', '8.8.8.8'])


const START_SERVER = () => {
  const app = express()
  const PORT = env.APP_PORT

  app.use('/api/tasks', taskRouter)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

  exitHook(() => {
    CLOSE_DB()
  })
}

CONNECT_DB()
  .then(() => console.log('Connected to MongoDB'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })