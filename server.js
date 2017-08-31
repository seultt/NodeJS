// 모듈 가져오기
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('hello express')
})

app.listen(3000, () => {
  console.log('listening...')
})