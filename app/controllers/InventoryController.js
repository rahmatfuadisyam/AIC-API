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

        const imagePath = path.join(__dirname, '../../public/images/inventory')
        const fileUpload = new Resize(imagePath)
        image = await fileUpload.save(req.file.buffer, req.file.originalname)
        const item = {
          idUnit: req.body.idUnit,
          code: req.body.code,
          name: req.body.name,
          description: req.body.description,
          condition: req.body.condition,
          quantity: req.body.quantity,
          source: req.body.source,
          receiptDate: req.body.receiptDate,
          responsiblePerson: req.body.responsiblePerson,
          image: image,
          capacity: req.body.capacity,
          length: req.body.length,
          height: req.body.height,
          width: req.body.width,
        }
        data = await Inventory.create(item)
        res.status(201).json(data)
      } catch (error) {
        res.status(500).json({ error: error.errors[0].message })
      }
    })
  }

  async read(req, res) {
    const { id } = req.params
    try {
      let inventory = null
      if (id === undefined) {
        inventory = await Inventory.findAll({
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
        inventory = await Inventory.findByPk(id)
      }
      if (!inventory) {
        res.status(404).json({ message: 'Inventory not found' })
      } else {
        res.status(200).json(inventory)
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

        let item = {
          idUnit: req.body.idUnit,
          code: req.body.code,
          name: req.body.name,
          description: req.body.description,
          condition: req.body.condition,
          quantity: req.body.quantity,
          source: req.body.source,
          receiptDate: req.body.receiptDate,
          responsiblePerson: req.body.responsiblePerson,
          capacity: req.body.capacity,
          length: req.body.length,
          height: req.body.height,
          width: req.body.width,
        }

        if (req.file) {
          const imagePath = path.join(
            __dirname,
            '../../public/images/inventory'
          )
          const fileUpload = new Resize(imagePath)
          image = await fileUpload.save(req.file.buffer, req.file.originalname)
          item.image = image

          const find = await Inventory.findByPk(id)
          await fs.unlink(`${imagePath}/${find.image}`, function (err) {
            if (err) throw err
          })
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
        res.status(500).json({ error: error.errors[0].message })
      }
    })
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
      res.status(500).json({ error: error.errors[0].message })
    }
  }
}

const inventoryController = new InventoryController()
module.exports = inventoryController
