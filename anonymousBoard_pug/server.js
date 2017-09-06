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

app.locals.pretty = true; //pug : jade express code pretty
app.set('view engine', 'pug') 
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {data})
})
app.get('/addPost', (req, res) => {
  res.render('addPost')
})

app.post('/addPost', (req, res) => {
  const title = req.body.title
  const user = req.body.user
  const content = req.body.content
  const num = data.length +1
  const date = gotdate(d)
  data.push({title, user, content, num, date })
  res.redirect('/')
})

app.get('/content/:num', (req, res) => {
  const num = parseInt(req.params.num)
  const matched = data.find(item => item.num === num)
  if(matched) {
    res.render('content', {matched})
  } else{
    res.status(404)
    res.send('Not defined 404 Error')
  }
})

app.listen(3000, () => {
  console.log('listening...')
})