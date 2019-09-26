const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const path = require('path')

let pages = fs.readdirSync(path.join(__dirname, '../middleware'))

pages.forEach(item => {
  let module = require(path.join(__dirname, `../middleware/${item}`))
  router.use('/rc/serve/' + item.replace('.js', ''), module.routes(), module.allowedMethods())
})

module.exports = {
  router
}