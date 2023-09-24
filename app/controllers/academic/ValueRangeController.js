const { ValueRange, Unit, Classroom } = require('@models')

class ValueRangeController {
  async create(req, res) {
    try {
      const data = await ValueRange.create(req.body)
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
        data = await ValueRange.findAll({
          include: [
            {
              model: Unit,
              as: 'unit',
              attributes: ['name'],
            },
            {
              model: Classroom,
              as: 'classroom',
              attributes: ['name'],
            },
          ],
          order: [['createdAt', 'DESC']],
        })
      } else {
        data = await ValueRange.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'ValueRange not found' })
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
      const [updatedRowsCount, updatedRows] = await ValueRange.update(
        req.body,
        {
          where: { id },
          returning: true,
        }
      )
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'ValueRange not found' })
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
      const deletedRowCount = await ValueRange.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'ValueRange not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Delete data failed' })
    }
  }
}

const valueRangeController = new ValueRangeController()
module.exports = valueRangeController
