const { Employee } = require('@models')
const { paginationService } = require('@services/helper.service')

class EmployeeController {
  async create(req, res) {
    try {
      const data = await Employee.create(req.body)
      res.status(201).json(data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async read(req, res) {
    const { id } = req.params
    try {
      let data = null
      if (id === undefined) {
        const { offset, limit } = paginationService(req.query)
        data = await Employee.findAndCountAll({
          offset: offset,
          limit: limit,
          order: [['createdAt', 'ASC']],
        })
      } else {
        data = await Employee.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Employee not found' })
      } else {
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async update(req, res) {
    const { id } = req.params
    try {
      const [updatedRowsCount, updatedRows] = await Employee.update(req.body, {
        where: { id },
        returning: true,
      })
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'Employee not found' })
      } else {
        res.status(200).json(updatedRows[0])
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async delete(req, res) {
    const { id } = req.params
    try {
      const deletedRowCount = await Employee.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Employee not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

const employeeController = new EmployeeController()
module.exports = employeeController
