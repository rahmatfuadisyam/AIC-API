const path = require('path')
const fs = require('fs')
const multer = require('multer')
const upload = multer().single('image')
const Resize = require('@services/resize.service')
const { Inventory, Unit } = require('@models')

class InventoryController {
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
            '../../public/images/inventory'
          )
          const fileUpload = new Resize(imagePath)
          image = await fileUpload.save(req.file.buffer, req.file.originalname)
          item.image = image
        }

        data = await Inventory.create(item)
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
        data = await Inventory.findAll({
          include: [
            {
              model: Unit,
              as: 'unit',
              attributes: ['name'],
            },
          ],
          order: [['createdAt', 'DESC']],
        })
      } else {
        data = await Inventory.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'Inventory not found' })
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
            '../../public/images/inventory'
          )
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

        const [updatedRowsCount, updatedRows] = await Inventory.update(item, {
          where: { id },
          returning: true,
        })
        if (updatedRowsCount === 0) {
          res.status(404).json({ message: 'Inventory not found' })
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
      const imagePath = path.join(__dirname, '../../public/images/inventory')
      const find = await Inventory.findByPk(id)
      if (find.image !== null) {
        await fs.unlink(`${imagePath}/${find.image}`, function (err) {
          if (err) console.log('Gambar tidak ditemukan')
        })
      }
      const deletedRowCount = await Inventory.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'Inventory not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Delete data failed' })
    }
  }
}

const inventoryController = new InventoryController()
module.exports = inventoryController
