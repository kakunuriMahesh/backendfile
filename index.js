// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");
// // const { error } = require("console");
// require("dotenv").config(); // Load environment variables
// const port  =process.env.PORT ||  4000


// app.use(express.json());
// app.use(cors());

// // Database connection with MongoDB

// mongoose.connect("mongodb://maheshkakunuri9:MongoDB1020@ac-w9ifaij-shard-00-00.rou1pon.mongodb.net:27017,ac-w9ifaij-shard-00-01.rou1pon.mongodb.net:27017,ac-w9ifaij-shard-00-02.rou1pon.mongodb.net:27017/?replicaSet=atlas-m1c3kt-shard-0&ssl=true&authSource=admin")

// // API creation

// app.get("/",(req, res)=>{
//     res.send("Express app is Running")
// })
// //////////////////////////////
// //Image Storage Engine

// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename:(req, file, cb)=>{
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({storage:storage})

// // Creating Upload endpoint for Images
// app.use('/images', express.static('upload/images'))

// app.post("/upload", upload.single('product'), (req, res) => {
//     const imageUrl = `http://localhost:${port}/images/${req.file.filename}`;

//     res.json({
//         success: 1,
//         image_url: imageUrl
//     });
// });

// // Schema for creating products

// const Product = mongoose.model('Product',{
//     id:{
//         type:Number,
//         require: true,
//     },
//     name:{
//         type:String,
//         require:true,
//     },
//     image:{
//         type:String,
//         require:true,
//     },
//     category:{
//         type:String,
//         require:true,
//     },
//     new_price:{
//         type:Number,
//         require: true,
//     },
//     old_price:{
//         type:Number,
//         require: true,
//     },
//     date:{
//         type:Date,
//         default:Date.now,
//     },
//     avilable:{
//         type:Boolean,
//         default:true,
//     },
// })

// app.post('/addproduct', async (req, res)=>{
//     let products = await Product.find({});
//     let id;
//     if (products.length>0)
//     {
//         let last_product_array = products.slice(-1);
//         let last_product = last_product_array[0];
//         id=last_product.id+1;
//     }
//     else
//     {
//         id=1;
//     }

//     const product = new Product({
//         id:id,
//         name:req.body.name,
//         image:req.body.image,
//         category:req.body.category,
//         new_price:req.body.new_price,
//         old_price:req.body.old_price,
//     });
//     console.log(product);
//     try {
//         await product.save();
//         console.log('Product saved successfully');
//         res.json({
//             success:true,
//             name:req.body.name,
//         })
//     } catch (error) {
//         console.error('Error saving product:', error.message);
//     }
//     // await product.save();
//     // console.log('save');
//     // res.json({
//     //     success:true,
//     //     name:req.body.name,
//     // })
// })

// // Creating Api for Deleating Product

// app.post('/removeproduct', async (req,res)=>{
//     await Product.findOneAndDelete({id:req.body.id});
//     console.log("Removed")
//     res.json({
//         success:true,
//         name:req.body.name
//         })
// })


// // Creating Api for Getting ALL Products
// app.get("/allproducts", async(req,res)=>{
//     let products = await Product.find({});
//     console.log("All products Fetched");
//     res.send(products);
// })


// // Schema creating for user model

// const User = mongoose.model('Users',{
//     name:{
//         type:String,
//     },
//     email:{
//         type:String,
//         unique:true,
//     },
//     password:{
//         type:String,
//     },
//     cartData:{
//         type:Object,
//     },
//     date:{
//         type:Date,
//         default:Date.now,
//     }
// })

// // Creating Endpoint for registery the user

// app.post('/signup',async(req,res)=>{
//     let check = await User.findOne({email:req.body.email});
//     if (check){
//         return res.status(400).json({success:false, errors:"existing user found with same email address"})
//     }
//     let cart = {};
//     for (let i = 0; i < 300; i++) {
//         cart[i]=0;
        
//     }
//     const user = new User({
//         name:req.body.username,
//         email:req.body.email,
//         password:req.body.password,
//         cartData:cart,
//     })

//     await user.save();

//     const data = {
//         user:{
//             id:user.id
//         }
//     }


//     const token = jwt.sign(data, 'secret_ecom');
//     res.json({success:true, token});

// })

// // creating endpoinr for user login
// app.post('/login',async(req,res)=>{
//     let user = await User.findOne({email:req.body.email});
//     if (user){
//         const passCompare = req.body.password === user.password;
//         if (passCompare) {
//             const data = {
//                 user:{
//                     id:user.id
//                 }
//             }
//             const token = jwt.sign(data, 'secret_ecom');
//             res.json({success:true, token})
//         }
//         else{
//             res.json({success:false,errors:"Wrong Password"});
//         }
//     }
//     else{
//         res.json({success:false,errors:"wrong Email Id"})
//     }
// })

// //Creating Endpoint for Newcollection
// app.get('/newcollections',async(req,res)=>{
//     let products = await Product.find({});
//     let newCollection = products.slice(1).slice(-8);
//     console.log('Newcollection Fetched');
//     res.send(newCollection);
// })

// //Creating middleware to fetch user
//     const fetchUser = async (req,res,next)=>{
//         const token = req.header('auth-token');
//         if (!token) {
//             res.status(401).send({errors:'Please authenticate using valid token'})
//         }
//         else{
//             try {
//                 const data = jwt.verify(token,'secret_ecom');
//                 req.user = data.user;
//                 next();
//             } catch (error) {
//                 req.status(401).send({errors:"please authenticate using a valid token"})
//             }
//         }
//     }


// //Creating endpoint for adding products in cartdata
// app.post('/addtocart',fetchUser, async (req,res)=>{
//     console.log('Added',req.body.itemId);
//     let userData = await User.findOne({_id:req.user.id});
//     userData.cartData[req.body.itemId] += 1;
//     await User.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
//     res.send('Added')
// })


// // creating endpoint to remove product from cartdata
// app.post('/removefromcart',fetchUser,async(req,res)=>{
//     console.log('Removed',req.body.itemId);
//     let userData = await User.findOne({_id:req.user.id});
//     if (userData.cartData[req.body.itemId]>0) {
//         userData.cartData[req.body.itemId] -= 1;
//         await User.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
//         res.send('Removed')
//     }
// })

// // creating endpoint to get cartdata
// app.post('/getcart', fetchUser, async(req,res)=>{
//     console.log('GetCart');
//     let userData = await User.findOne({_id:req.user.id});
//     res.json(userData.cartData);
    
// })

// //////////////////////////
// app.listen(port, (error)=>{
//     if (!error){
//         console.log("Server Running on Port "+port);
//     }
//     else{
//         console.log("Error:" +error);
//     }
// })



// // mongodb+srv://maheshkakunuri9:MongoDB1020@cluster0.rou1pon.mongodb.net/