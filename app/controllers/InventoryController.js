const { Inventory } = require('@models')
const { paginationService } = require('@services/helper.service')

class InventoryController {
  async create(req, res) {
    try {
      const data = await Inventory.create(req.body)
      res.status(201).json(data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async read(req, res) {
    const { id } = req.params
    try {
      let inventory = null
      if (id === undefined) {
        const { offset, limit } = paginationService(req.query)
        inventory = await Inventory.findAndCountAll({
          offset: offset,
          limit: limit,
          order: [['code', 'ASC']],
        })
      } else {
        inventory = await Inventory.findByPk(id)
      }
      if (!inventory) {
        res.status(404).json({ message: 'Inventory not found' })
      } else {
        res.status(200).json(inventory)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async update(req, res) {
    const { id } = req.params
    try {
      const [updatedRowsCount, updatedRows] = await Inventory.update(req.body, {
        where: { id },
        returning: true,
      })
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'Inventory not found' })
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
      const deletedRowCount = await Inventory.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Inventory not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

const inventoryController = new InventoryController()
module.exports = inventoryController
