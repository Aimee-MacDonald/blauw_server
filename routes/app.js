const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log('App Connection')
  res.send('<h1>App</h1>')
})

module.exports = router