const { SchoolIdentity } = require('@models')

class SchoolIdentityController {
  async create(req, res) {
    try {
      const data = await SchoolIdentity.create(req.body)
      res.status(201).json(data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async read(req, res) {
    const { id } = req.params
    try {
      let schoolIdentity = null
      if (id === null) {
        schoolIdentity = await SchoolIdentity.findAll()
      } else {
        schoolIdentity = await SchoolIdentity.findByPk(id)
      }
      if (!schoolIdentity) {
        res.status(404).json({ message: 'School identity not found' })
      } else {
        res.status(200).json(schoolIdentity)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async update(req, res) {
    const { id } = req.params
    try {
      const [updatedRowsCount, updatedRows] = await SchoolIdentity.update(
        req.body,
        {
          where: { id },
          returning: true,
        }
      )
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'School identity not found' })
      } else {
        res.status(200).json(updatedRows[0])
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

const schoolIdentityController = new SchoolIdentityController()
module.exports = schoolIdentityController
