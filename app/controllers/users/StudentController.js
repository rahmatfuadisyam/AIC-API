const { Student } = require('@models')

class StudentController {
  async create(req, res) {
    try {
      const data = await Student.create(req.body)
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
        data = await Student.findAll({
          order: [['createdAt', 'ASC']],
        })
      } else {
        data = await Student.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Student not found' })
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
      const [updatedRowsCount, updatedRows] = await Student.update(req.body, {
        where: { id },
        returning: true,
      })
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'Student not found' })
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
      const deletedRowCount = await Student.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Student not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

const studentController = new StudentController()
module.exports = studentController
