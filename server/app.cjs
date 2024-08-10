const express = require('express');
const path = require('path');

const app = express();
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, '../src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/product/:model',(req,res)=>{
  const model = req.params.model
  res.render('product',{model})
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});
