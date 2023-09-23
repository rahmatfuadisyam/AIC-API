const {
  Lesson,
  Unit,
  Curriculum,
  Department,
  Employee,
  LessonGroup,
} = require('@models')

class LessonController {
  async create(req, res) {
    try {
      const data = await Lesson.create(req.body)
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
        data = await Lesson.findAll({
          include: [
            {
              model: Unit,
              as: 'unit',
              attributes: ['name'],
            },
            {
              model: Curriculum,
              as: 'curriculum',
              attributes: ['name'],
            },
            {
              model: Department,
              as: 'department',
              attributes: ['name'],
            },
            {
              model: Employee,
              as: 'employee',
              attributes: ['name'],
            },
            {
              model: LessonGroup,
              as: 'lessonGroup',
              attributes: ['name'],
            },
          ],
          order: [['createdAt', 'DESC']],
        })
      } else {
        data = await Lesson.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Lesson not found' })
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
      const [updatedRowsCount, updatedRows] = await Lesson.update(req.body, {
        where: { id },
        returning: true,
      })
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'Lesson not found' })
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
      const deletedRowCount = await Lesson.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Lesson not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Delete data failed' })
    }
  }
}

const lessonController = new LessonController()
module.exports = lessonController
