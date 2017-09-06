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

// admin 계정 삭제

app.post('/admin/:num/del',authMiddleware, (req, res) => {
  const num = parseInt(req.params.num)
  const matched = data.findIndex(item => item.num === num)
  if(matched === -1) {
    return res.status(404)
  }
  data.splice(matched, 1)
  // data.splice(num-1, 1) // 요소가 삭제 되어 인덱스 값이 변경되기 때문에 라우트 핸들러의 num값으로 splice 하면 오류가 생긴다.
  console.log('data')
  res.redirect('/admin')
})

// addPost 데이터에 추가
app.post('/addPost', (req, res) => {
  let num
  if(!data.length){num=1} else {
    num = Math.max(...data.map(item => item.num)) // Math.max가 배열을 받는게 아니라 인자 전체 중에 최대값을 찾는거라 spread 연산자를 써야한다.
    console.log(data)
    console.log(typeof num) 
    num++
  }
  const header = req.body.header
  const content = req.body.content
  data.push({num, header, content })
  console.log(num)
 
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