const path = require('path')
const fs = require('fs')
const multer = require('multer')
const upload = multer().single('photo')
const Resize = require('@services/resize.service')
const { Employee, Unit, PtkType, EmployeeStatus, Grade } = require('@models')

class EmployeeController {
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
          const imagePath = path.join(
            __dirname,
            '../../../public/images/employee'
          )
          const fileUpload = new Resize(imagePath)
          image = await fileUpload.save(req.file.buffer, req.file.originalname)
          item.photo = image
        }

        data = await Employee.create(item)
        res.status(201).json(data)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Create data failed' })
      }
    })
  }

  async read(req, res) {
    const { id } = req.params
    try {
      let data = null
      if (id === undefined) {
        data = await Employee.findAll({
          include: [
            {
              model: Unit,
              as: 'unit',
              attributes: ['name'],
            },
            {
              model: PtkType,
              as: 'ptkType',
              attributes: ['name'],
            },
            {
              model: EmployeeStatus,
              as: 'employeeStatus',
              attributes: ['name'],
            },
            {
              model: Grade,
              as: 'grade',
              attributes: ['name'],
            },
          ],
          order: [['name', 'ASC']],
        })
      } else {
        data = await Employee.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Employee not found' })
      } else {
        res.status(200).json(data)
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Read data failed' })
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
          const imagePath = path.join(
            __dirname,
            '../../../public/images/employee'
          )
          const fileUpload = new Resize(imagePath)
          image = await fileUpload.save(req.file.buffer, req.file.originalname)
          item.photo = image

          const find = await Employee.findByPk(id)
          if (find.photo !== null) {
            await fs.unlink(`${imagePath}/${find.photo}`, function (err) {
              if (err) throw err
            })
          }
        }

        const [updatedRowsCount, updatedRows] = await Employee.update(item, {
          where: { id },
          returning: true,
        })
        if (updatedRowsCount === 0) {
          res.status(404).json({ message: 'Employee not found' })
        } else {
          res.status(200).json(updatedRows[0])
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Update data failed' })
      }
    })
  }

  async delete(req, res) {
    const { id } = req.params
    try {
      const imagePath = path.join(__dirname, '../../../public/images/employee')
      const find = await Employee.findByPk(id)
      if (find.photo !== null) {
        await fs.unlink(`${imagePath}/${find.photo}`, function (err) {
          if (err) throw err
        })
      }
      const deletedRowCount = await Employee.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Employee not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Delete data failed' })
    }
  }
}

const employeeController = new EmployeeController()
module.exports = employeeController
