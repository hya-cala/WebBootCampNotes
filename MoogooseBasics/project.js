const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp').then (()=>{
    console.log('connection open!');
}).catch((e)=>{
    console.log('connection error!');
    console.log(e);
});

const productSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: true,
        maxLength: 20
    }, 
    price: {
        type: Number, 
        required: true,
        min: [0, 'Price must be positive!']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String],
        default: ['cycling']
    },
    qty: {
        online: {
            type: Number,
            default:0
        },
        instore: {
            type: Number, 
            default: 0
        }
    },
    size:{
        type: String,
        enum: ['S', 'L', 'M']
    }
})

productSchema.methods.greet = function(){
    console.log('hello');
    console.log(`- from ${this.name}`);
}

productSchema.method.toggleOnSale = function() {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.method.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save()
}

productSchema.statics.fireSale = function() {
    this.updateMany({}, {onSale: true,price : 0})
}

const Product = mongoose.model('Product', productSchema);

// const bike = new Product({name:'Mountain Bike', price: 599, qty:{instore: 10}});
// const bike = new Product({name: 'Tire Pump', price: 20})
// bike.save().then(data => {
//     console.log('IT WORKED!')
// }).catch(e=>{
//     console.log('OH NO ERROR!');
//     console.log(e);
// })

const findProduct = async ()=> {
    const foundProduct = await Product.findOne({name:'Bike Helmet'});
    foundProduct.greet();
    await findProduct.toggleOnSale();
    await findProduct.addCategory('outdoor');
    console.log(foundProduct);
}

Product.findOneAndUpdate({name:'Tire Pump'}, {price: -10}, {new: true, runValidators: true})
.then(data=> {
    console.log('IT WORKED');
    console.log(data);
}).catch(e=>{
    console.log('OH NO ERROR!');
    console.log(e);
})

Product.fireSale().then(res=>console.log(res));
