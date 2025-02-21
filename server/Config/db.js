const mongoose = require('mongoose')

async function connectDB(){
    try {
        await mongoose.connect('mongodb+srv://sunny:sunny@sunny.jmr7x.mongodb.net/todo')
        console.log('connected with database')
    } catch (error) {
        console.log(error)
    }
}



module.exports = connectDB