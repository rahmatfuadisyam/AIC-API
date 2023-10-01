const { Curriculum } = require('@models')

class CurriculumController {
  async create(req, res) {
    try {
      let act = req.body.active
      if (typeof act === 'string') {
        if (act === 'true') act = true
      }
      if (act === true) {
        await Curriculum.update(
          {
            active: false,
          },
          { where: {} }
        )
      }
      const data = await Curriculum.create(req.body)
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
        data = await Curriculum.findAll({ order: [['createdAt', 'DESC']] })
      } else {
        data = await Curriculum.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Curriculum not found' })
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
      let act = req.body.active
      if (typeof act === 'string') {
        if (act === 'true') act = true
      }
      if (act === true) {
        await Curriculum.update(
          {
            active: false,
          },
          { where: {} }
        )
      }
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
      console.log(error)
      res.status(500).json({ error: 'Update data failed' })
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
      console.log(error)
      res.status(500).json({ error: 'Delete data failed' })
    }
  }
}

const curriculumController = new CurriculumController()
module.exports = curriculumController
