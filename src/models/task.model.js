import Joi from 'joi'
import { GET_DB } from '~/config/db.js'
import { ObjectId } from 'mongodb'

const TASK_COLLECTION_NAME = 'tasks'

const TASK_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(100).trim(),
  status: Joi.string().valid('Active', 'Complete').default('Active'),
  completedAt: Joi.date().timestamp('javascript').default(null),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
  return await TASK_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validatedData = await validateBeforeCreate(data)
    const newTaskToAdd = {
      ...validatedData
    }
    const result = await GET_DB().collection(TASK_COLLECTION_NAME).insertOne(newTaskToAdd)
    const createdTask = await GET_DB()
      .collection(TASK_COLLECTION_NAME)
      .findOne({ _id: result.insertedId })
    return createdTask
  } catch (error) {
    throw new Error(error)
  }
}

const getList = async () => {
  try {
    const tasks = await GET_DB().collection(TASK_COLLECTION_NAME).find().sort({ createdAt: -1 }).toArray()
    return tasks || []
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (taskId, updateData) => {
  try {
    Object.keys(updateData).forEach(fieldName => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete updateData[fieldName]
      }
    })

    const validatedUpdateData = await validateBeforeCreate(updateData)
    const newUpdateData = { ...validatedUpdateData }

    const result = await GET_DB()
      .collection(TASK_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(taskId) },
        { $set: newUpdateData },
        { returnDocument: 'after' }
      )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const remove = async (taskId) => {
  try {
    const result = await GET_DB().collection(TASK_COLLECTION_NAME).findOneAndDelete({ _id: new ObjectId(taskId) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const taskModel = {
  createNew,
  getList,
  update,
  remove
}