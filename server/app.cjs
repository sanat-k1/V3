const express = require('express')
const path = require('path')
const bodyparser=  require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')

mongoose.connect('mongodb://127.0.0.1:27017/WEB')

const app = express();
const port = 3000
app.set("view engine","ejs")
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, '../src')));
app.use(cookieParser())

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});
const User = mongoose.model('User',userSchema)

const productschema =  new mongoose.Schema({
  productid :{ type: Number,unique: true},
  productname:{type: String},
  productcost:{type:Number},
})

const product = mongoose.model('Product',productschema)

const products= {
  "3090":0,
  "3080":0,
  "3070":0,
  "3060":0,
  "2080":0,
  "2070":0,
  "2060":0
}

app.get('/', (req, res) => {
  const prod= 'products'
  if(!req.cookies[prod]){
    res.cookie('products',JSON.stringify(products),{ maxAge: 315360000000,path:'/'})
  }
  res.sendFile(path.join(__dirname, '../public/index.html'));
  
});

app.get('/product/:model',(req,res)=>{
  const model = req.params.model
  res.render('product',{model})
})

app.get('/cart',async (req,res)=>{
  const cartcookie = req.cookies['products']
  if(cartcookie){
    const cart = JSON.parse(cartcookie)
    const productNames = Object.keys(cart).filter(product => cart[product] >= 1)
    const productsFromDB = await product.find({ productname: { $in: productNames } })
    let total =0
    const cartDetails = productsFromDB.map(prod => {
      const quantity = cart[prod.productname]
      const cost = prod.productcost * quantity
      total += cost
      return {
        productname: prod.productname,
        productcost: prod.productcost,
        quantity: quantity,
        cost: cost
      }
    })
    res.render('cart', { cartDetails, total })
  }else{
    res.render('cart',{ cartDetails: [], totalCost: 0 })
  }
  
})

app.get('/checkout',(req,res)=>{
  res.render('checkout')
})

app.get('/profile',(req,res)=>{
  res.render('profile')
})

app.get('/signup',(req,res)=>{
  res.sendFile((path.join(__dirname, '../public/signup.html')))
})

app.post('/signup',async (req,res)=>{
  const {username,password,email} =req.body
  console.log(username,password,email)
  try {
    const exist = await User.findOne({$or:[{username},{email}]})
    if(exist){
      if (username===exist.username)
        {res.send("username already taken")}
      if (email===exist.email){
        res.send("email exists")
      }
    }
    else{
    const user = new User({ username, password, email })
    await user.save()
    res.redirect('/')
  }
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).send('Server error')
  }
  
})

app.get('/error/:msg',(req,res)=>{

})

app.get('/login',(req,res)=>{
  res.sendFile((path.join(__dirname, '../public/login.html')))
})

app.post('/login',async (req,res)=>{
  const {username,password} = req.body
  try {
    const user = await User.findOne({ username })
    if (user && user.password === password) {
      res.cookie('username', username, { maxAge: 315360000000,path:'/'})
      console.log('looged in')
      res.redirect('/')
    } else {
      res.status(401).send('Unauthorized')
    }
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).send('Server error')
  }
  console.log(username,password)
})


app.listen(port, () => {
  console.log('Server is running on http://localhost:3000/')
})
