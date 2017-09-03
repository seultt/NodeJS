const express = require('express')
const app = express()

app.locals.pretty = true; //pug : jade express code pretty
app.set('view engine', 'pug') 
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {time:Date(), title:'Jade'})
})

app.listen(3000, () => {
  console.log('listening...')
})