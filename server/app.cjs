const express = require('express');
const path = require('path');

const app = express();
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, '../src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/product',(req,res)=>{
  res.sendFile(path.join(__dirname,'../public/product.html'))
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});
