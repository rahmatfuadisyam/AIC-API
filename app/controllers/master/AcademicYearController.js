const { AcademicYear } = require('@models')

class AcademicYearController {
  async create(req, res) {
    try {
      if (req.body.active === true) {
        await AcademicYear.update({
          active: false,
        })
      }
      const data = await AcademicYear.create(req.body)
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
        data = await AcademicYear.findAll({ order: [['createdAt', 'DESC']] })
      } else {
        data = await AcademicYear.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Academic Year not found' })
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
      if (req.body.active === true) {
        await AcademicYear.update({
          active: false,
        })
      }
      const [updatedRowsCount, updatedRows] = await AcademicYear.update(
        req.body,
        {
          where: { id },
          returning: true,
        }
      )
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'Academic Year not found' })
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
      const deletedRowCount = await AcademicYear.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Academic Year not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Delete data failed' })
    }
  }
}

const academicYearController = new AcademicYearController()
module.exports = academicYearController
