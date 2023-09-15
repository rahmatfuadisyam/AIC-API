const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { addAlias } = require('module-alias')
const axios = require('axios')

// set up the express app
const app = express()
app.use(cors())

// public path
app.use('/public', express.static(__dirname + '/../public'))

// define alias
addAlias('@models', __dirname + '/models')
addAlias('@services', __dirname + '/services')
addAlias('@public', __dirname + '../public')

//set route
const authRoute = require('../routes/auth')
const masterRoute = require('../routes/master')
const usersRoute = require('../routes/users')
const academicRoute = require('../routes/academic')
const presenseRoute = require('../routes/presense')
const inventoryRoute = require('../routes/inventory')
const financeRoute = require('../routes/finance')
const reportRoute = require('../routes/report')

//parse incoming requests data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//fill routes
app.use('/auth', authRoute)
app.use('/master', masterRoute)
app.use('/users', usersRoute)
app.use('/academic', academicRoute)
app.use('/presense', presenseRoute)
app.use('/inventory', inventoryRoute)
app.use('/finance', financeRoute)
app.use('/report', reportRoute)

// app.use(function (req, res, next) {
//   let token = req.headers.authorization || ''
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // fix ssl not secure
//   let headers = {
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": token
//     },
//     responseType: 'json'
//   }

//   axios.post('http://localhost:9000/auth/validation', null, headers)
//   .then(function(res) {
//     if(res.data.result.type == 'member') {
//       app.use('/master', masterRoute)
//     }
//     next()
//   })
//   .catch(function (err) {
//     console.log(err.response.status)
//     res.status(err.response.status).send(err.response.data)
//   })
// })

//set up a default catch-all route
app.get('/', (req, res) =>
  res.status(200).send({
    message: 'Hello World',
  })
)

module.exports = app
