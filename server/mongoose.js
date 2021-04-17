const mongoose = require('mongoose');

async function connectToDB(uri){
    try {
        await mongoose.connect('mongodb://localhost:27017/test',{ useUnifiedTopology: true,useNewUrlParser: true })
        .then( () => console.log("DB Connected") );
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connectToDB };

 