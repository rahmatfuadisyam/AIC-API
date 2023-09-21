const {
  Classroom,
  Unit,
  Employee,
  Department,
  Building,
  Room,
} = require('@models')

class ClassroomController {
  async create(req, res) {
    try {
      const data = await Classroom.create(req.body)
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
        data = await Classroom.findAll({
          include: [
            {
              model: Unit,
              as: 'unit',
              attributes: ['name'],
            },
            {
              model: Employee,
              as: 'employee',
              attributes: ['name'],
            },
            {
              model: Department,
              as: 'department',
              attributes: ['name'],
            },
            {
              model: Building,
              as: 'building',
              attributes: ['name'],
            },
            {
              model: Room,
              as: 'room',
              attributes: ['name'],
            },
          ],
          order: [['code', 'ASC']],
        })
      } else {
        data = await Classroom.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Classroom not found' })
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
      const [updatedRowsCount, updatedRows] = await Classroom.update(req.body, {
        where: { id },
        returning: true,
      })
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'Classroom not found' })
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
      const deletedRowCount = await Classroom.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Classroom not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Delete data failed' })
    }
  }
}

const classroomController = new ClassroomController()
module.exports = classroomController
