const express = require("express")
const todo = require('../Modules/todo.Module')
const todorouter = express.Router()


todorouter.post('/create', async (req, res) => {
    try {
      const { title , isComplete ,status } = req.body;

      const newtodo = await todo.create({
        title,
        isComplete,
        status,
      });
  
     res.send(newtodo)
      res.status(201).json({ message: "todo saved successfully!" });

    } catch (error) {
     
      res.status(500).send()
    }
  });
  

  
  todorouter.get('/read',async (req,res)=>{
  
    const data =  await todo.find({})
   res.send(data)
 })
 
 todorouter.delete('/delete/:id',async (req,res)=>{
   
      await todo.findByIdAndDelete(req.params.id)
    res.send({message : 'document is deleted'})
  })
  
 
  todorouter.patch('/update/:id',async (req,res)=>{
    
      try {
        const { id } = req.params;
        const updatedTask = await todo.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Task updated successfully", updatedTask });
      } catch (err) {
        res.status(400).json({ message: "Something went wrong" });
      }
    
 })
 
 



  module.exports = todorouter;