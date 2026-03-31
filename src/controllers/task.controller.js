import { responseSuccess } from '../common/helpers/response.helper.js'
import { taskService } from '../services/task.service.js'

export const taskController = {
  create: async function (req, res, next) {
    try {
      const result = await taskService.create(req)
      const response = responseSuccess(result, 'Create task successfully')
      res.status(response.code).json(response)
    } catch (err) {
      next(err)
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await taskService.findAll(req)
      const response = responseSuccess(result, 'Get all tasks successfully')
      res.status(response.code).json(response)
    } catch (err) {
      next(err)
    }
  },

  findOne: async function (req, res, next) {
    try {
      const result = await taskService.findOne(req)
      const response = responseSuccess(result, `Get task #${req.params.id} successfully`)
      res.status(response.code).json(response)
    } catch (err) {
      next(err)
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await taskService.update(req)
      const response = responseSuccess(result, `Update task #${req.params.id} successfully`)
      res.status(response.code).json(response)
    } catch (err) {
      next(err)
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await taskService.remove(req)
      const response = responseSuccess(result, `Remove task #${req.params.id} successfully`)
      res.status(response.code).json(response)
    } catch (err) {
      next(err)
    }
  }
}