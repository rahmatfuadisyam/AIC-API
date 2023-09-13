const { Building } = require('@models')

class BuildingController {
  async create(req, res) {
    try {
      const data = await Building.create(req.body)
      res.status(201).json(data)
    } catch (error) {
      res.status(500).json({ error: error.errors[0].message })
    }
  }

  async read(req, res) {
    const { id } = req.params
    try {
      let data = null
      if (id === undefined) {
        data = await Building.findAll({
          order: [['code', 'ASC']],
        })
      } else {
        data = await Building.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Building not found' })
      } else {
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(500).json({ error: error.errors[0].message })
    }
  }

  async update(req, res) {
    const { id } = req.params
    try {
      const [updatedRowsCount, updatedRows] = await Building.update(req.body, {
        where: { id },
        returning: true,
      })
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'Building not found' })
      } else {
        res.status(200).json(updatedRows[0])
      }
    } catch (error) {
      res.status(500).json({ error: error.errors[0].message })
    }
  }

  async delete(req, res) {
    const { id } = req.params
    try {
      const deletedRowCount = await Building.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Building not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      res.status(500).json({ error: error.errors[0].message })
    }
  }
}

const buildingController = new BuildingController()
module.exports = buildingController
