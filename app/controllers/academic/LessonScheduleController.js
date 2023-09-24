const {
  LessonSchedule,
  Lesson,
  Unit,
  AcademicYear,
  Classroom,
  Room,
  Employee,
} = require('@models')

class LessonScheduleController {
  async create(req, res) {
    try {
      const data = await LessonSchedule.create(req.body)
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
        data = await LessonSchedule.findAll({
          include: [
            {
              model: Unit,
              as: 'unit',
              attributes: ['name'],
            },
            {
              model: AcademicYear,
              as: 'academicYear',
              attributes: ['name'],
            },
            {
              model: Classroom,
              as: 'classroom',
              attributes: ['name'],
            },
            {
              model: Lesson,
              as: 'lesson',
              attributes: ['name'],
            },
            {
              model: Room,
              as: 'room',
              attributes: ['name'],
            },
            {
              model: Employee,
              as: 'employee',
              attributes: ['name'],
            },
          ],
          order: [['createdAt', 'DESC']],
        })
      } else {
        data = await LessonSchedule.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'LessonSchedule not found' })
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
      const [updatedRowsCount, updatedRows] = await LessonSchedule.update(
        req.body,
        {
          where: { id },
          returning: true,
        }
      )
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'LessonSchedule not found' })
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
      const deletedRowCount = await LessonSchedule.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'LessonSchedule not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Delete data failed' })
    }
  }
}

const lessonScheduleController = new LessonScheduleController()
module.exports = lessonScheduleController
