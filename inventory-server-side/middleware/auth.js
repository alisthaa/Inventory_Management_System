var jwt = require('jsonwebtoken');
function checkAuthentication (req, res, next){
    console.log(req.headers.authorization)
    try{
        loggedIn = false

        let token = req.headers.authorization?.replace("Bearer ","")
if (token){
    try{
        var decoded = jwt.verify(token,'shhhhh');
        console.log(decoded);
        loggedIn = true
        req.user= decoded
    }
    catch(err){
        console.log(err);
        console.log("jsonwebtoken error");
    }
}
if(!loggedIn){
    return res.status(401).send("unauthenticated")

}
console.log("here");
next()
    }
catch(err){
    res.send("server err")
}
}
module.exports ={
    checkAuthentication
}