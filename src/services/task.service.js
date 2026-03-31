import { taskModel } from '~/models/task.model.js'

const createNew = async (reqBody) => {
  try {
    const result = await taskModel.createNew(reqBody)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getList = async () => {
  try {
    const data = await taskModel.getList()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (taskId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedProduct = await taskModel.update(taskId, updateData)
    return updatedProduct
  } catch (error) {
    throw new Error(error)
  }
}

const remove = async (taskId) => {
  try {
    const result = await taskModel.remove(taskId)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const taskService = {
  createNew,
  getList,
  update,
  remove
}
