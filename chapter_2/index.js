const fs=require('fs')
const path=require('path')

fs.readFile(path.join(__dirname,'files','starter.txt'),'utf8',(err,data)=>{
    if(err) console.log( err)
    console.log(data)
}
)

fs.writeFile(path.join(__dirname,'files','reply.txt'),'Hi its my reply from Ador',(err)=>{
        if(err) console.log( err)
    console.log("file has been written")

})

fs.appendFile(path.join(__dirname,'files','reply.txt'),'\n\n\n file hubf',(err)=>{
        if(err) console.log( err)
    console.log("file has been appended")

})

fs.unlink(path.join(__dirname,"files","reply.txt"),(err)=>{
    if(err) console.log(err)
})