// 모듈 가져오기
const express = require('express')
const morgan = require('morgan')

const data = [
  {num: '1', header: '첫 게시글'}
]

const app = express()



app.set('view engine', 'ejs')
app.use('/static', express.static('public'))
app.use(morgan('tiny'))




app.get('/', (req, res) => {
  res.render('index.ejs', {data})
})

app.get('/addPost', (req, res) => {
  res.render('addPost.ejs')
})




app.listen(3000, () => {
  console.log('listening...')
})