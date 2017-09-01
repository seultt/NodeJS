// 모듈 가져오기
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const data = [
  {num: 1, header: '첫 게시글', content: '우왕 신기하다'}
]

const app = express()



app.set('view engine', 'ejs')
app.use('/static', express.static('public'))
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))



app.get('/', (req, res) => {
  res.render('index.ejs', {data})
})

app.get('/addPost', (req, res) => {
  res.render('addPost.ejs')
})

app.post('/addPost', (req, res) => {
  const header = req.body.header
  const content = req.body.content
  const num = data.length +1
  data.push({header, num, content })
  res.redirect('/')
})

app.get('/content/:num', (req, res) => {
  const num = parseInt(req.params.num)
  const matched = [...data].find(item => item.num === num)
  console.log(matched)
  if (matched) {
    res.render('content.ejs',{matched})
  } else {
    res.status(404)
    res.send('404 Not Found')
  }
})

app.listen(3001, () => {
  console.log('listening...')
})
