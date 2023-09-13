const bcrypt = require('bcrypt')
const authService = require('@services/auth.service')
const { member } = require('@models')

class AuthController {
  async login(req, res) {
    req.start = Date.now()
    let status
    let message
    let token
    let username = req.header('username')
    let password = req.header('password')
    let response = {}

    const dtMember = await member.findOne({ where: { username: username } })
    if (!dtMember) {
      status = 404
      message = 'Data member tidak ditemukan'
    } else {
      const match = await bcrypt.compare(password, dtMember.password)
      if (match === false) {
        status = 401
        message = 'Unauthorized'
        token = null
      } else {
        token = await authService().issue({ id: username, type: 'member' })
        token = `Bearer ${token}`
        status = 200
        message = 'Login berhasil'
        response = {
          username: dtMember.username,
          name: dtMember.name,
          phone: dtMember.phone,
          email: dtMember.email,
        }
      }
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
      result: response,
    }
    res.set({ Authorization: token })
    res.set({ 'Access-Control-Allow-Headers': '*' })
    res.set({ 'Access-Control-Expose-Headers': 'Authorization' })
    return res.status(status).json(data)
  }

  async validate(req, res) {
    req.start = Date.now()
    let data
    let status
    let message
    let response
    const token = req.header('Authorization').split('Bearer ')[1]

    let time = Date.now() - req.start
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    authService().verify(token, (error, result) => {
      if (error) {
        status = 401
        message = error.errors[0].message
        response = {
          isvalid: false,
        }
      } else {
        status = 200
        message = 'validasi sukses'
        response = {
          isvalid: true,
          type: result.type,
        }
      }

      data = {
        diagnostic: {
          status: status,
          message: message,
          memoryUsage: `${Math.round(used * 100) / 100} MB`,
          elapsedTime: time,
          timestamp: Date(Date.now()).toString(),
        },
        result: response,
      }
      return res.status(status).json(data)
    })
  }

  async profile(req, res) {}

  async logout(req, res) {}
}

const authController = new AuthController()
module.exports = authController
