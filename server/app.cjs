const express = require('express');
const path = require('path');

const app = express();
const port = 3000
app.set("view engine","ejs")
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

app.use(express.static(path.join(__dirname, '../src')));



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/product/:model',(req,res)=>{
  const model = req.params.model
  res.render('product',{model})
})

app.get('/cart',(req,res)=>{
  res.render('cart')
})

app.get('/signup',(req,res)=>{
  res.sendFile((path.join(__dirname, '../public/signup.html')))
})

app.get('/login',(req,res)=>{
  res.sendFile((path.join(__dirname, '../public/login.html')))
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
  console.log(`${port}`)
});
