const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp').then (()=>{
    console.log('connection open!');
}).catch((e)=>{
    console.log('connection error!');
    console.log(e);
});

const personSchema = new mongoose.Schema({
    first: String, 
    last: String
})
// not in the database, but only a property in mongoose
personSchema.virtual('fullName').get(()=>{
    return `${this.first} ${this.last}`
}).set(v=>{
    this.first = v.substr(0,v.indexOf(' '));
    this.last = v.substr(v.indexOf(' ') + 1);
})

personSchema.pre('save', async function () {
    console.log('About to save');
})
personSchema.post('save', async function () {
    console.log('just saved');
})

const Person = mongoose.model('Person', personSchema);
const tammy = new Person({first: 'Tammy', last: 'Chow'})
console.log(tammy.fullName);
tammy.save();