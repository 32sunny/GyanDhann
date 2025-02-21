const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({ 
    title : {type : String , require:true},
    isComplete :  {type : Boolean , default : false},
    status : { type : String , ennu : ["Low" , "Medium","High"] , default : "Low"}
})

const todo = mongoose.model('todo' , TodoSchema)

module.exports = todo
