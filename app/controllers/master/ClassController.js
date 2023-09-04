const { Class } = require('@models')

class ClassController {
  async create(req, res) {
    try {
      const data = await Class.create(req.body)
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
        data = await Class.findAll()
      } else {
        data = await Class.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Class not found' })
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
      const [updatedRowsCount, updatedRows] = await Class.update(req.body, {
        where: { id },
        returning: true,
      })
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'Class not found' })
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
      const deletedRowCount = await Class.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Class not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

const classController = new ClassController()
module.exports = classController
