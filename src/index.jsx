const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 1203


app.use(express.static(path.join(__dirname, 'public')));
console.log('Serving static files from:', path.join(__dirname, 'public'));

// HTTP Logger
// app.use(morgan('combined'))

// Template Engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));


// routing
app.get('/', (req, res) => {
  res.render('home');
})
app.get('/news', (req, res) => {
  res.render('news');
})

app.get('/search', (req, res) => {
  console.log('Query Parameters:', req.query.q); 
  res.render('search');
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})