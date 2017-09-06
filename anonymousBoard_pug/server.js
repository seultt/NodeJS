const express = require('express')
var bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

// 날짜 함수
const d = new Date()
function gotdate(today){
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return monthNames[today.getMonth()]+' '+'0'+today.getDate()
}

// data
const data = [
  {num: 1, title: '첫 게시글을 축하드립니다.', user: '헤헷', content:'Lorem Ipsum is simply dummy text of the printing and', date: 'SEP 05'},
  {num: 2, title: '첫 게시글을 축하드립니다.', user: '헤헷', content:'Lorem Ipsum is simply dummy text of the printing and', date: 'SEP 05'}
]
// comentData
const commentData = [
  {num: 1, user: '헤헷', comment:'Lorem Ipsum is simply dummy text of the printing and', date: 'SEP 05'},
  {num: 2, user: '헤헷', comment:'Lorem Ipsum is simply dummy text of the printing and', date: 'SEP 05'}
]

app.locals.pretty = true; //pug : jade express code pretty
app.set('view engine', 'pug') 
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {data})
})
app.get('/addPost', (req, res) => {
  res.render('addPost')
})


// addPost 게시글 추가
app.post('/addPost', (req, res) => {
  let num
  if(!data.length){ num = 1 } else {
    num = Math.max(...data.map(item => item.num))
    num++
  }
  const title = req.body.title
  const user = req.body.user
  const content = req.body.content
  const date = gotdate(d)
  data.push({title, user, content, num, date })
  res.redirect('/')
})

// content 내용, 댓글 로드
app.get('/content/:num', (req, res) => {
  const num = parseInt(req.params.num)
  const matched = data.find(item => item.num === num)
  const commentMatched = commentData.filter(item => item.num === num)
  if(matched && commentMatched) {
    res.render('content', {matched, commentMatched})
  } else{
    res.status(404)
    res.send('Not defined 404 Error')
  }
})

app.listen(3000, () => {
  console.log('listening...')
})