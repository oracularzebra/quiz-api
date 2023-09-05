const express = require("express");
const { CreateNewUser } = require("./users/sign_up");
const authorize_user = require('./users/sign_in').AuthorizeUser;

const app = express();
const port = 9001;

app.get('/', (req,res)=>{
    res.send("hello world");
});
app.listen(port, ()=>{
    console.log(`Host is listening on port ${port}`);
});

app.post('/sign-in', async(req, res)=>{

    if(Object.keys(req.query).length == 0 ||
        req.query.username == undefined ||
        req.query.password == undefined) res.status(500).send("Ha ha..");

    const username = req.query.username.toString().trim();
    const pass = req.query.password.toString().trim();

    if(username.length == 0 || username.includes(' ')){
        res.send({success:true,message:"Please enter correct Username"});
    }
    else{
        const result = await authorize_user(username, pass);
        res.send({success:false,message:result[1]});
    }
});

app.post('/sign-up', (req, res)=>{

    if(Object.keys(req.query).lenght == 0) res.send('Please enter username and password');
    
    const username = req.query.username.toString().trim();
    const password = req.query.password.toString().trim();

    CreateNewUser(username, password)
        .then(result => {
            result?
                res.send({success:true,message:'Please login using newly created username and password'}): 
                res.send({success:true,message:'Username already existed'});
        });
})
app.get('*', (req, res)=>{
    res.status(404).send("Page Not Exist");
})