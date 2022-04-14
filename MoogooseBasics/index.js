// https://mongoosejs.com/docs/guide.html

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp').then (()=>{
    console.log('connection open!');
}).catch((e)=>{
    console.log('connection error!');
    console.log(e);
});

// create a schema
const movieSchema = new mongoose.Schema({
    title: String, 
    year: Number,
    rating:String,
    score:Number
});

// create a model
const Movie = mongoose.model('Movie', movieSchema); // The mongo will create a collection called movies

// create an entry
const amadeus = new Movie({title:'Amadeus', year: 1986, score: 9.2, rating:'R'});

// amadeus.score = 0.5;
// amadeus.save();

// Movie.insertMany([
//     {title:'Amelia',year:2001, score: 8.3, rating:'R'},
//     {title: 'Alien', year: 1979, score: 8.1, rating:'R'},
//     {title: 'The Iron Giant', year: 1999, score: 7.5, rating:'PG'},
//     {title:'Stand By Me', year: 1986, score: 8.6, rating:'R'},
//     {title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating:'PG-13'}
// ])
// .then((data)=>{
//     console.log('it worked!');
//     console.log(data);
// })
// .catch((e)=>{
//     console.log('error!');
//     console.log(e);
// });

// await Movie.find({rating:'PG-13'}).then((data)=>{
//     console.log(data);
// });

// Movie.findById("6248e95d10385cdcc17e304b").then(m=>
//     console.log(m));


//c============================== update ==============================
// Movie.updateOne({title:'Amadeus'}, {year:1984}).then(res=>{
//     console.log(res);
// });

// Movie.updateMany({title:{$in: ['Amadeus', 'Stand By Me']}}, {score: 10}).then(res=>console.log(res));

// Movie.findOneAndUpdate({},{score:7});

//============================== Delete ===============================
// Movie.remove({title:'Amelie'}).then(msg=>console.log(msg));
// Movie.deleteMany({year:{$gte: 1999}}).then(msg => console.log(msg));
// Movie.findOneAndDelete({title:'Alien'}).then(m=>console.log(m));

//============================== Schema ================================

