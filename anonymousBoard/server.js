// 모듈 가져오기
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')


const data = [
  {num: 1, header: '첫 게시글', content: '우왕 신기하다'}
]
const subData = [
  {num: 1, name: '알라쑝', coment: '축핰ㅋ'},
  {num: 1, name: '알라쑝', coment: '축핰ㅋ'},
  {num: 1, name: '알라쑝', coment: '축핰ㅋ'}
]


const app = express()

const authMiddleware = basicAuth({
    users: { 'admin': '1234' },
    challenge: true,
    realm: 'Imb4T3st4pp'
})

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
app.get('/admin', authMiddleware, (req, res) => {
  res.render('admin.ejs',{data})
})

// addPost 내용 전송
app.post('/addPost', (req, res) => {
  const header = req.body.header
  const content = req.body.content
  const num = data.length +1
  data.push({header, num, content })
  res.redirect('/')
})

// content 내용, 댓글 로드
app.get('/content/:num', (req, res) => {
  const num = parseInt(req.params.num)
  const matched = data.find(item => item.num === num)
  const subMatched = subData.filter(sitem => sitem.num === num)
  console.log(matched)
  console.log(subMatched)
  if (matched && subMatched) {
    res.render('content.ejs',{matched, subMatched})
  } else {
    res.status(404)
    res.send('404 Not Found')
  }
})

// 댓글 내용 전송
app.post('/content/:num', (req, res) => {
  const num = parseInt(req.params.num)
  const name = req.body.name
  const coment = req.body.coment
  subData.push({name, num, coment })
  console.log(subData)
  res.redirect('/content/'+num)
})



app.listen(3002, () => {
  console.log('listening...')
})
