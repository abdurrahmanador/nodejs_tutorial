const fsPromise=require('fs').promises
const { error } = require('console')
const path=require('path')

const rf=async()=>{
    try{
        const data=await fsPromise.readFile(path.join(__dirname,'files','lorem.txt'),'utf8')
        console.log("File has been read");
        await fsPromise.writeFile(path.join(__dirname,'files','lorem_copy.txt'),data)
        console.log("File has been written");
        await fsPromise.appendFile(path.join(__dirname,'files','lorem_copy.txt'),'\n\nAppended Text')
        console.log("File has been appended");
        const newData=await fsPromise.readFile(path.join(__dirname,'files','lorem_copy.txt'),'utf8')
        console.log(newData);
        await fsPromise.rename(path.join(__dirname,'files','lorem_copy.txt'),path.join(_dirname,'files','lorem_renamed.txt'))
        console.log("File has been renamed");
        await fsPromise.unlink(path.join(__dirname,'files','lorem_renamed.txt'))
        console.log("File has been deleted"); 
    }catch(error){
        console.log(error)
    }
}
rf();