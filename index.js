const  { getTodo, addTodo , newTodo } = require("./CRUD.js");
const express = require("express");
const app = express();
app.use(express.json());

app.get("/gettodo", (req,res)=>{
  let data  = getTodo();
  res.send(data);
});


app.post("/addtodo",(req,res)=>{
  let taskitem = req.body;
  console.log(taskitem);
  let mssg= addTodo(taskitem);
  res.send(mssg);
})

app.delete("/delete/:id" , (req , res)=>{
    let data = getTodo();
    const found = data.some(element=>element.id===parseInt(req.params.id))
    
    if(found){
       for(let i=0; i<data.length; i++){
           let element = data[i];
           if(element.id==req.params.id){
               data.splice(i,1); 
               res.send(data);
               newTodo(data);
               return;
            }
       }
       res.send(data);
   }
   else{
     res.send({msg: `No member with the id ${req.params.id}`});
   }

});

app.patch("/edit/:id" , (req , res)=>{
    let data = getTodo();
    let newData = req.body;
    const found = data.some(element=>element.id===parseInt(req.params.id))

   if(found){
      data.forEach(element => {
          if(element.id==req.params.id){
          element.todo = newData.todo;
          newTodo(data); 
          }
      });
      res.send(data);
   }
   else{
    res.send({msg: `No member with the id ${req.params.id}`});
   }
})

app.listen(3000,()=>{
    console.log("server started");
});