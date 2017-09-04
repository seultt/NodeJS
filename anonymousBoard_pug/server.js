const express = require('express')
const app = express()

// 날짜 함수
const d = new Date()
function gotdate(today){
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return monthNames[today.getMonth()]+' '+'0'+today.getDate()
}

// data
const data = [
  {num: 1, title: '첫 게시글을 축하드립니다.', user: '헤헷', content:'Lorem Ipsum is simply dummy text of the printing and', date: gotdate(d)},
  {num: 2, title: '첫 게시글을 축하드립니다.', user: '헤헷', content:'Lorem Ipsum is simply dummy text of the printing and', date: gotdate(d)}
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

app.listen(3000, () => {
  console.log('listening...')
})