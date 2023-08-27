const authController = require('./AuthController')
const inventoryController = require('./InventoryController')
const memberController = require('./MemberController')
const documentationController = require('./DocumentationController')

const controllers = {
  authController,
  inventoryController,
  memberController,
  documentationController,
}

module.exports = controllers
