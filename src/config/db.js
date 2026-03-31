import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment.js'

let shopDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  })

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  shopDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!shopDatabaseInstance) throw new Error('Must connect database first !!!')
  return shopDatabaseInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}