//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
 
//set dynamic views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));

//set public folder as static folder for static file
app.use(express.static('public'));

//route untuk halaman home
app.get('/',(req, res) => {
  //render file index.hbs
  res.render('index', {
      name : "Baby Cattleya",
      npm : "140810160048"
  });
});

//route untuk manampilkan form
app.get('/post',(req, res) => {
    //render file form.hbs
    res.render('form');
  });
   
//route untuk submit form
app.post('/post',(req, res) => {
//render file form.hbs
res.render('index',{
    //ambil value dari textname
    name : req.body.name,
    npm : req.body.npm,
    email : req.body.email
});
});
 
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});