const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./", "data.json");

function getTodo() {
    try {
        const data = fs.readFileSync(filePath, { encoding: "utf-8" });
        return data.length === 0 ? [] : JSON.parse(data);
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

function addTodo(value) {
    try {
        const data = fs.readFileSync(filePath, { encoding: "utf-8" });
        const todoData = data.length === 0 ? [] : JSON.parse(data);
        todoData.push(value);
        
        fs.writeFileSync(filePath, JSON.stringify(todoData));
        return  todoData;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

function newTodo(data){

    try{
      fs.writeFileSync(filePath,JSON.stringify(data));
    }catch(err){
        console.error(err.message);
        return null;
    }

}

module.exports = { getTodo, addTodo , newTodo };
