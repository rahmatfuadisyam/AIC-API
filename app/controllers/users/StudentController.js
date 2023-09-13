const path = require('path')
const fs = require('fs')
const multer = require('multer')
const upload = multer().single('image')
const Resize = require('@services/resize.service')
const { Student, Unit, Classroom, Department } = require('@models')

class StudentController {
  async create(req, res) {
    let data
    let image
    await upload(req, res, async function (err) {
      try {
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
        } else if (err) {
          return res.status(500).json(err)
        }

        let item = req.body
        if (req.file) {
          const imagePath = path.join(__dirname, '../../public/images/student')
          const fileUpload = new Resize(imagePath)
          image = await fileUpload.save(req.file.buffer, req.file.originalname)
          item.image = image
        }

        data = await Student.create(item)
        res.status(201).json(data)
      } catch (error) {
        res.status(500).json({ error: error.errors[0].message })
      }
    })
  }

  async read(req, res) {
    const { id } = req.params
    try {
      let data = null
      if (id === undefined) {
        data = await Student.findAll({
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
            {
              model: Department,
              as: 'department',
              attributes: ['name'],
            },
          ],
          order: [['createdAt', 'ASC']],
        })
      } else {
        data = await Student.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Student not found' })
      } else {
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(500).json({ error: error.errors[0].message })
    }
  }

  async update(req, res) {
    let image
    await upload(req, res, async function (err) {
      const { id } = req.params
      try {
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
        } else if (err) {
          return res.status(500).json(err)
        }

        let item = req.body

        if (req.file) {
          const imagePath = path.join(__dirname, '../../public/images/student')
          const fileUpload = new Resize(imagePath)
          image = await fileUpload.save(req.file.buffer, req.file.originalname)
          item.image = image

          const find = await Inventory.findByPk(id)
          if (find.image !== null) {
            await fs.unlink(`${imagePath}/${find.image}`, function (err) {
              if (err) throw err
            })
          }
        }

        const [updatedRowsCount, updatedRows] = await Student.update(item, {
          where: { id },
          returning: true,
        })
        if (updatedRowsCount === 0) {
          res.status(404).json({ message: 'Student not found' })
        } else {
          res.status(200).json(updatedRows[0])
        }
      } catch (error) {
        res.status(500).json({ error: error.errors[0].message })
      }
    })
  }

  async delete(req, res) {
    const { id } = req.params
    try {
      const imagePath = path.join(__dirname, '../../public/images/student')
      const find = await Inventory.findByPk(id)
      if (find.image !== null) {
        await fs.unlink(`${imagePath}/${find.image}`, function (err) {
          if (err) throw err
        })
      }
      const deletedRowCount = await Student.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Student not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      res.status(500).json({ error: error.errors[0].message })
    }
  }
}

const studentController = new StudentController()
module.exports = studentController
