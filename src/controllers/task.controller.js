import { StatusCodes } from 'http-status-codes'
import { responseSuccess } from '~/common/helpers/response.helper.js'
import { taskService } from '~/services/task.service.js'
import { ObjectId } from 'mongodb'

const createNew = async (req, res, next) => {
  try {
    const result = await taskService.createNew(req.body)
    const response = responseSuccess(result, 'Create task successfully', StatusCodes.CREATED)
    res.status(response.code).json(response)
  } catch (err) {
    next(err)
  }
}

const getList = async (req, res, next) => {
  try {
    const tasks = await taskService.getList()
    const resData = responseSuccess(tasks, 'Get all tasks successfully')
    res.status(resData.code).json(resData)
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const taskId = req.params.id
    const { ...updateFields } = req.body

    if (!taskId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        code: StatusCodes.BAD_REQUEST,
        message: 'Task ID is can not be empty'
      })
    }

    if (!ObjectId.isValid(taskId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        code: StatusCodes.BAD_REQUEST,
        message: 'Task ID is invalid'
      })
    }

    const updateData = { ...updateFields }

    const updatedTask = await taskService.update(taskId, updateData)
    const resData = responseSuccess(updatedTask, 'Task updated successfully')
    res.status(resData.code).json(resData)
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const taskId = req.params.id

    if (!ObjectId.isValid(taskId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        code: StatusCodes.BAD_REQUEST,
        message: 'Task ID is invalid'
      })
    }

    const result = await taskService.remove(taskId)

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        code: StatusCodes.NOT_FOUND,
        message: 'Task not found'
      })
    }

    const resData = responseSuccess(result, 'Task removed successfully')
    res.status(resData.code).json(resData)

  } catch (error) {
    next(error)
  }
}

export const taskController = {
  createNew,
  getList,
  update,
  remove
}