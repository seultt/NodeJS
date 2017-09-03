const express = require('express')
const app = express()

const data = [
  {num: 1, title: '첫 게시글을 축하드립니다.', user: '헤헷', content:'Lorem Ipsum is simply dummy text of the printing and', date: Date()}
]

app.locals.pretty = true; //pug : jade express code pretty
app.set('view engine', 'pug') 
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {data})
})

app.listen(3000, () => {
  console.log('listening...')
})