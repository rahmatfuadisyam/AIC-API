const {
  StudentPresence,
  Unit,
  AcademicYear,
  Classroom,
  LessonSchedule,
  Employee,
  Student,
} = require('@models')

class StudentPresenceController {
  async create(req, res) {
    try {
      const data = await StudentPresence.create(req.body)
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
        data = await StudentPresence.findAll({
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
              model: LessonSchedule,
              as: 'lessonSchedule',
              attributes: ['name'],
            },
            {
              model: Employee,
              as: 'employee',
              attributes: ['name'],
            },
            {
              model: Student,
              as: 'student',
              attributes: ['nipd', 'nisn', 'name'],
            },
          ],
          where: {
            idUnit: req.query.idUnit,
            idAcademicYear: req.query.idAcademicYear,
            idClassroom: req.query.idClassroom,
            idLessonSchedule: req.query.idLessonSchedule,
          },
          order: [[{ model: Student, as: 'student' }, 'nipd', 'ASC']],
        })
      } else {
        data = await StudentPresence.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'StudentPresence not found' })
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
      const [updatedRowsCount, updatedRows] = await StudentPresence.update(
        req.body,
        {
          where: { id },
          returning: true,
        }
      )
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'StudentPresence not found' })
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
      const deletedRowCount = await StudentPresence.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'StudentPresence not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Delete data failed' })
    }
  }
}

const studentPresenceController = new StudentPresenceController()
module.exports = studentPresenceController
