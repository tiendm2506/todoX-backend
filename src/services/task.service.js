export const taskService = {
  create: async function (req) {
    return 'This action create'
  },

  findAll: async function (req) {
    return 'This action returns all task'
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} task`
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} task`
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} task`
  }
}