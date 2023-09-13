const { EmployeeStatus } = require('@models')

class EmployeeStatusController {
  async create(req, res) {
    try {
      const data = await EmployeeStatus.create(req.body)
      res.status(201).json(data)
    } catch (error) {
      res.status(500).json({ error: error.errors[0].message })
    }
  }

  async read(req, res) {
    const { id } = req.params
    try {
      let data = null
      if (id === undefined) {
        data = await EmployeeStatus.findAll()
      } else {
        data = await EmployeeStatus.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Employee Status not found' })
      } else {
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(500).json({ error: error.errors[0].message })
    }
  }

  async update(req, res) {
    const { id } = req.params
    try {
      const [updatedRowsCount, updatedRows] = await EmployeeStatus.update(
        req.body,
        {
          where: { id },
          returning: true,
        }
      )
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'Employee Status not found' })
      } else {
        res.status(200).json(updatedRows[0])
      }
    } catch (error) {
      res.status(500).json({ error: error.errors[0].message })
    }
  }

  async delete(req, res) {
    const { id } = req.params
    try {
      const deletedRowCount = await EmployeeStatus.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Employee Status not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      res.status(500).json({ error: error.errors[0].message })
    }
  }
}

const employeeStatusController = new EmployeeStatusController()
module.exports = employeeStatusController
