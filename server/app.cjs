const express = require('express')
const path = require('path')
const bodyparser=  require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')


mongoose.connect('mongodb://127.0.0.1:27017/WEB')

const app = express();
const port = 3001
app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, '../src')));
app.use(cookieParser())
app.use(express.json())

const gpu = [
  { model: "rtx3090", description: "The NVIDIA GeForce RTX 3090 is the flagship card of the RTX 30 series, boasting a massive 24 GB of GDDR6X memory. It is built on the Ampere architecture, which provides substantial improvements in performance and efficiency over its predecessors. This GPU excels in 4K gaming, offering high frame rates and exceptional graphical detail. It's also well-suited for intensive tasks like 3D rendering, video editing, and AI research, thanks to its large memory capacity and powerful CUDA cores. The RTX 3090 supports advanced features such as real-time ray tracing and AI-enhanced graphics, making it a top choice for enthusiasts and professionals seeking the best performance available." },
  { model: "rtx3080", description: "The NVIDIA GeForce RTX 3080 delivers outstanding gaming performance and is a key player in the RTX 30 series lineup. Equipped with 10 GB of GDDR6X memory and built on the Ampere architecture, it provides a significant boost in performance compared to previous generations. The RTX 3080 is designed to handle 4K gaming with ease, allowing for high frame rates and detailed visuals. It also supports real-time ray tracing and NVIDIA's DLSS technology, which enhances image quality and performance. This GPU is ideal for gamers who want a high-end experience without stepping up to the more expensive RTX 3090." },
  { model: "rtx3070", description: "The NVIDIA GeForce RTX 3070 offers impressive performance for its price point, featuring 8 GB of GDDR6 memory and the Ampere architecture. It is designed to provide excellent 1440p and strong 4K gaming experiences, making it a versatile choice for both high-resolution gaming and demanding applications. The RTX 3070 supports real-time ray tracing and NVIDIA's DLSS technology, which enhances visual fidelity and performance. This GPU strikes a balance between cost and performance, making it a popular choice among gamers and content creators who want high-end features without breaking the bank." },
  { model: "rtx3060", description: "The NVIDIA GeForce RTX 3060 is a mid-range graphics card featuring 12 GB of GDDR6 memory. Built on the Ampere architecture, it is designed to provide excellent performance for 1080p and entry-level 1440p gaming. The RTX 3060 supports advanced features such as real-time ray tracing and DLSS, offering enhanced visual quality and performance. It is an ideal choice for gamers who want a solid performance at a more affordable price, making it a great option for those who are upgrading from older GPUs or who are new to PC gaming." },
  { model: "rtx2080", description: "The NVIDIA GeForce RTX 2080, part of the Turing architecture, features 8 GB of GDDR6 memory and represents a significant advancement over the previous GTX 10 series. It provides strong performance for 1440p and 4K gaming, with support for real-time ray tracing and AI-enhanced graphics through NVIDIA's RTX technology. The RTX 2080 is well-suited for gamers and creators who want high-quality visuals and smooth performance in demanding applications. It's a solid choice for those who want to experience the benefits of Turing architecture without stepping up to the higher-end RTX 2080 Ti." },
  { model: "rtx2070", description: "The NVIDIA GeForce RTX 2070 is a capable mid-to-high-end GPU from the Turing series, equipped with 8 GB of GDDR6 memory. It offers excellent performance for 1440p gaming and is capable of handling entry-level 4K gaming with decent settings. The RTX 2070 supports real-time ray tracing and DLSS, providing enhanced graphics and performance. This GPU is a good choice for gamers who want a balance of performance and cost, delivering strong performance in most modern games and creative applications." },
  { model: "rtx2060", description: "The NVIDIA GeForce RTX 2060 is an entry-level GPU from the Turing architecture, featuring 6 GB of GDDR6 memory. It is designed for solid 1080p and some 1440p gaming performance, with support for real-time ray tracing and AI-powered features through NVIDIA's RTX technology. The RTX 2060 provides good value for gamers looking for high-quality graphics and performance at a more affordable price. It is also a great option for those new to gaming or upgrading from older graphics cards." }
];

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String,required: true},
  email: { type: String, required: true, unique: true },
  address:{type:String,required:true},
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

const orderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  products: [
    {
      productname: { type: String, required: true },
      quantity: { type: Number, required: true },
      cost: { type: Number, required: true },
    },
  ],
  totalCost: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

app.get('/', (req, res) => {
  const prod= 'products'
  if(!req.cookies[prod]){
    res.cookie('products',JSON.stringify(products),{ maxAge: 315360000000,path:'/'})
  }
  res.render('index')
});

app.get('/search', (req, res) => {
  const searchKeyword = req.query.searchKeyword.toLowerCase();
  
  // Try to find the product model that matches the search term
  const matchedProduct = gpu.find(product => 
    product.model.toLowerCase() === searchKeyword
  );
  
  if (matchedProduct) {
    // If a match is found, redirect to the product's page
    return res.redirect(`/product/${matchedProduct.model}`);
  } else {
    // If no match is found, redirect back or send an error
    return res.status(404).send('Product not found');
  }
});


// app.get('/test',(req,res)=>{
//   res.sendFile((path.join(__dirname, '../public/streams.html')))
// })

app.get('/cart', async (req, res) => {
  const username = req.cookies['username']
  if(username){
    const user = await User.findOne({username:username})
  
  const cartcookie = req.cookies['products'];
  if (cartcookie) {
    const cart = JSON.parse(cartcookie);
    const productNames = Object.keys(cart).filter(product => cart[product] >= 1);
    const productsFromDB = await product.find({ productname: { $in: productNames } });
    let total = 0;

    const cartDetails = productsFromDB.map(prod => {
      const quantity = cart[prod.productname];
      const cost = prod.productcost * quantity;
      total += cost;
      
      // Get images for each product
      const model = `rtx${prod.productname}`;
      const productImages = images[model] || [];
      const image = productImages[0]

      return {
        productname: prod.productname,
        productcost: prod.productcost,
        quantity: quantity,
        cost: cost,
        images: image// Include images in cart details
      };
    });

    res.render('newcart', { cartDetails, total ,user});
    
  } else {
    res.render('newcart', { cartDetails: [], total: 0 ,user});
  }
}
});

app.post('/process-payment', async (req, res) => {
  const cartCookie = req.cookies['products'];
  const username = req.cookies['username'];

  if (cartCookie && username) {
    const cart = JSON.parse(cartCookie);
    const productNames = Object.keys(cart).filter(product => cart[product] >= 1);
    const productsFromDB = await product.find({ productname: { $in: productNames } });

    let totalCost = 0;
    const orderProducts = productsFromDB.map(prod => {
      const quantity = cart[prod.productname];
      const cost = prod.productcost * quantity;
      totalCost += cost;
      return {
        productname: prod.productname,
        quantity: quantity,
        cost: cost
      };
    });

    // Save order to database
    const newOrder = new Order({
      username: username,
      products: orderProducts,
      totalCost: totalCost
    });

    await newOrder.save();

    // Clear cart after placing order
    res.clearCookie('products');
    res.redirect('/orders');
  } else {
    res.status(400).send('No items in the cart or user not logged in.');
  }
});

app.get('/orders',(req,res)=>{
  res.render('orders')
})

app.get('/checkout',(req,res)=>{
  res.render('checkout')
})

const images = {
  'rtx3090': [
    '/assets/images/rt390.jpg',
    '/assets/images/rt390-2.jpg',
    '/assets/images/rt390-3.jpg'
  ],
  'rtx3080': [
    '/assets/images/rt380.jpg',
    '/assets/images/rt380-2.jpg',
    '/assets/images/rt380-3.jpg'
  ],
  'rtx3070': [
    '/assets/images/rt370.jpg',
    '/assets/images/rt370-2.jpg',
    '/assets/images/rt370-3.jpg'
  ],
  'rtx3060': [
    '/assets/images/rt360.jpg',
    '/assets/images/rt360-2.jpg',
    '/assets/images/rt360-3.jpg'
  ],
  'rtx2080': [
    '/assets/images/rt280.png',
    '/assets/images/rt280-2.png',
    '/assets/images/rt280-3.png'
  ],
  'rtx2070': [
    '/assets/images/rt270.jpg',
    '/assets/images/rt270-2.jpg',
    '/assets/images/rt270-3.jpg'
  ],
  'rtx2060': [
    '/assets/images/rt260.png',
    '/assets/images/rt260-2.png',
    '/assets/images/rt260-3.png'
  ]
}
const weights = {
  "3090": 2.7,
  "3080": 2.5,
  "3070": 2.4,
  "3060": 2.2,
  "2080": 2.6,
  "2070": 2.5,
  "2060": 2.3
};

app.get('/product/:model',async(req,res)=>{
  const model = req.params.model
  const description = gpu.find(item=>item.model === model)
  const price = await product.findOne({productname:model.slice(3,)})
  const productcost = price ? price.productcost : 'Not available'
  const modelimages = images[model] 
  const modelname = model.slice(3,)
  res.render('product',{model,description,productcost,images: modelimages,weight:weights[modelname]})
})

app.get('/profile',async(req,res)=>{
  const username = req.cookies['username']
  if(!username){
    res.render('/login')
  }
    const user = await User.findOne({username:username})
    try {
      const orders = await Order.find({username})
      const productFrequency = {}
      let number_of_products = 0
      let details = []
      let tot =0
      
      orders.forEach(order => {
        tot += order.totalCost
        order.products.forEach(product => {
          const image = images['rtx' + product.productname][0]
          const date = order.orderDate
          const total = order.totalCost
          const prod = "RTX"+product.productname
          details.push({
            image:image,
            date:date,
            total:total,
            prod:prod
          })
          
          if (productFrequency[product.productname]) {
            productFrequency[product.productname] += product.quantity
            
          } else {
            productFrequency[product.productname] = product.quantity
          }
          number_of_products +=product.quantity
        });
      });
      const sortedProducts = Object.entries(productFrequency)
      .sort((a, b) => b[1] - a[1])
      .map(entry => ({ productname: entry[0], quantity: entry[1] }))
     
      let productImages = sortedProducts.map(product => {
        return {
          productname: product.productname,
          image: (images['rtx'+product.productname][0])
        }
      })
      productImages =productImages.slice(0,3)
      details = details.slice(0,5)
      res.render('profile',{user,productImages,details,number_of_products,tot})
    }
    catch (error) {
      console.error('Error fetching popular items:', error)
      res.status(500).send('Server error')
    }
})

app.post('/update-profile', async (req, res) => {
  const { name, address } = req.body;
  const olduser = req.cookies['username'];
  try {
    const user = await User.findOne({ username: olduser });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    const result = await User.updateOne(
      { username: olduser },
      { $set: { name, address } }
    );
    // if (result.nModified > 0) {
    //   res.json({ success: true, message: 'Profile updated successfully' });
    // } else {
    //   res.json({ success: false, message: 'No changes made or user not found' });
    // }
    res.redirect('/profile')
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// login nd sign up

app.get('/signup',(req,res)=>{
  res.render('signup')
})

app.post('/signup',async (req,res)=>{
  const {username,password,email,address,name} =req.body
  console.log(username,password,email, address, name )
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
    const user = new User({ username, password, name, email, address})
    await user.save()
    res.cookie('username',username,{ maxAge: 315360000000,path:'/'})
    res.redirect('/')
  }
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).send('Server error')
  }
  
})

app.get('/login',(req,res)=>{
  res.render('login')
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
  console.log(`Server is running on http://localhost:${port}/`)
})