const { StudentParent, Student } = require('@models')

class StudentParentController {
  async create(req, res) {
    try {
      const data = await StudentParent.create(req.body)
      res.status(201).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Create data failed' })
    }
  }

  async read(req, res) {
    const { id } = req.params
    try {
      let data = null
      if (id === undefined) {
        data = await StudentParent.findAll({
          include: [
            {
              model: Student,
              as: 'student',
              attributes: ['name'],
            },
          ],
        })
      } else {
        data = await StudentParent.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'StudentParent not found' })
      } else {
        res.status(200).json(data)
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Read data failed' })
    }
  }

  async update(req, res) {
    const { id } = req.params
    try {
      const [updatedRowsCount, updatedRows] = await StudentParent.update(
        req.body,
        {
          where: { id },
          returning: true,
        }
      )
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'StudentParent not found' })
      } else {
        res.status(200).json(updatedRows[0])
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Update data failed' })
    }
  }

  async delete(req, res) {
    const { id } = req.params
    try {
      const deletedRowCount = await StudentParent.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'StudentParent not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Delete data failed' })
    }
  }
}

const studentParentController = new StudentParentController()
module.exports = studentParentController
