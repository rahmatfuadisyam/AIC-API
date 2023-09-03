const { Unit } = require('@models')
const { paginationService } = require('@services/helper.service')

class UnitController {
  async create(req, res) {
    try {
      const data = await Unit.create(req.body)
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
        data = await Unit.findAndCountAll({
          offset: offset,
          limit: limit,
        })
      } else {
        data = await Unit.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Unit not found' })
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
      const [updatedRowsCount, updatedRows] = await Unit.update(req.body, {
        where: { id },
        returning: true,
      })
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'Unit not found' })
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
      const deletedRowCount = await Unit.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Unit not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

const unitController = new UnitController()
module.exports = unitController
