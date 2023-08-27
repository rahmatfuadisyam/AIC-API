const { Curriculum } = require('@models')
const { paginationService } = require('@services/helper.service')

class CurriculumController {
  async create(req, res) {
    try {
      const data = await Curriculum.create(req.body)
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
        data = await Curriculum.findAndCountAll({
          offset: offset,
          limit: limit,
          order: [['code', 'ASC']],
        })
      } else {
        data = await Curriculum.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Curriculum not found' })
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
      const [updatedRowsCount, updatedRows] = await Curriculum.update(
        req.body,
        {
          where: { id },
          returning: true,
        }
      )
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'Curriculum not found' })
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
      const deletedRowCount = await Curriculum.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Curriculum not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

const curriculumController = new CurriculumController()
module.exports = curriculumController
