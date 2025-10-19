
console.log("Hello world")

console.log(__dirname)
console.log(__filename)

const os=require("os");
const path=require("path");


console.log(os.homedir())
console.log(os.version())
console.log(os.type())
console.log(path.basename(__filename))
console.log(path.extname(__filename))


const math=require("./math");

console.log(math.add(2,4))
console.log(math.sub(2,4))
console.log(math.mult(2,4))
console.log(math.div(2,4))