const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
const Products = require('./models/product');
const categories = ['fruit', 'vegetable', 'dairy'];

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand').then (()=>{
    console.log('connection open!');
}).catch((e)=>{
    console.log('connection error!');
    console.log(e);
});

app.get('/products', async (req, res) => {
    const {category} = req.query;
    if (category){
        const products = await Products.find({category:category});
        res.render('products/index',{products, category});
    }else{
        const products = await Products.find({});
        res.render('products/index',{products, category: 'All'});
    }
})

app.get('/products/new', (req, res) => {
    res.render('products/new',{categories})
})
app.post('/products', async(req, res)=>{
    console.log(req.body);
    const newProduct = new Products(req.body);
    await newProduct.save()
    console.log(newProduct);
    res.redirect(`products/${newProduct._id}`)
})

app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params;
    const product = await Products.findById(id);
    res.render('products/edit', {product, categories})
})

app.put('/products/:id', async (req, res) =>{
    const {id} = req.params;
    const product = await Products.findByIdAndUpdate(id, req.body,{runValidators:true, new: true});
    console.log(req.body);
    res.redirect(`/products/${id}`)
})

app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Products.findById(id);
    res.render('products/show',{product})
})

app.delete('/products/:id', async (req, res)=>{
    const {id} = req.params;
    const product = await Products.findByIdAndDelete(id);
    res.redirect('/products')
});

app.listen(3000, ()=> {
    console.log('LISTENING 3000!');
})