const { error } = require('console')
const fs=require('fs')

if(!fs.existsSync('./new')){
fs.mkdir('./new',(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Folder created")
    }  
})}

if(fs.existsSync('./new' )){
fs.rmdir('./new',(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Folder deleted")
    }  
})}