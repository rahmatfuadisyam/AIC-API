const bcrypt = require('bcrypt')
const { member } = require('@models')

class MemberController {
  async insertData(req, res) {
    //set diagnostic
    req.start = Date.now()
    let status
    let message
    let dtMember
    let id

    //validate password
    if (req.body.password == req.body.confirmPassword) {
      status = 200
      message = `Berhasil menambahkan data`
      const item = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
      }
      dtMember = await member.create(item)
      id = dtMember.id
    } else {
      status = 404
      message = `Gagal menambahkan data, konfirmasi password tidak sesuai`
      id = null
    }

    //get diagnostic
    let time = Date.now() - req.start
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    const data = {
      diagnostic: {
        status: status,
        message: message,
        memoryUsage: `${Math.round(used * 100) / 100} MB`,
        elapsedTime: time,
        timestamp: Date(Date.now()).toString(),
      },
      result: {
        id: id,
      },
    }
    return res.status(status).json(data)
  }

  async selectData(req, res) {
    //set diagnostic
    req.start = Date.now()
    let status
    let message
    let dtMember

    if (req.params.id == null) {
      //select all
      dtMember = await member.findAll({ order: [['id', 'ASC']] })
    } else {
      //select by id
      dtMember = await member.findOne({
        where: { id: req.params.id },
        order: [['id', 'ASC']],
      })
    }

    if (!dtMember) {
      status = 404
      message = 'Data member tidak ditemukan'
    } else {
      status = 200
      message = 'sukses'
    }

    //get diagnostic
    let time = Date.now() - req.start
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    const data = {
      diagnostic: {
        status: status,
        message: message,
        memoryUsage: `${Math.round(used * 100) / 100} MB`,
        elapsedTime: time,
        timestamp: Date(Date.now()).toString(),
      },
      result: dtMember,
    }
    return res.status(status).json(data)
  }

  async updateData(req, res) {
    //set diagnostic
    req.start = Date.now()
    let status
    let message

    const dtMember = await member.findOne({ where: { id: req.params.id } })

    if (!dtMember) {
      status = 404
      message = `Data tidak ditemukan`
    } else {
      status = 200
      message = `Berhasil mengubah data`
      const item = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
      }
      await member.update(item, { where: { id: req.params.id } })
    }

    //get diagnostic
    let time = Date.now() - req.start
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    const data = {
      diagnostic: {
        status: status,
        message: message,
        memoryUsage: `${Math.round(used * 100) / 100} MB`,
        elapsedTime: time,
        timestamp: Date(Date.now()).toString(),
      },
      result: {},
    }
    return res.status(status).json(data)
  }

  async deleteData(req, res) {
    //set diagnostic
    req.start = Date.now()
    let status
    let message

    const dtMember = await member.findOne({ where: { id: req.params.id } })

    if (!dtMember) {
      status = 404
      message = `Data tidak ditemukan`
    } else {
      status = 200
      message = `Berhasil menghapus data`
      await member.destroy({ where: { id: req.params.id } })
    }

    //get diagnostic
    let time = Date.now() - req.start
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    const data = {
      diagnostic: {
        status: status,
        message: message,
        memoryUsage: `${Math.round(used * 100) / 100} MB`,
        elapsedTime: time,
        timestamp: Date(Date.now()).toString(),
      },
      result: {},
    }
    return res.status(status).json(data)
  }
}

const memberController = new MemberController()
module.exports = memberController
