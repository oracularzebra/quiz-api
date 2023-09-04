const express = require("express");
const { CreateNewUser } = require("./sign_up");
const check_username = require('./sign_in').SearchUsername;
const authorize_user = require('./sign_in').AuthorizeUser;

const app = express();
const port = 9000;

app.get('/', (req,res)=>{
    res.send("hello world");
});
app.listen(port, ()=>{
    console.log(`Host is listening on port ${port}`);
});

app.get('/sign-in', (req, res)=>{

    if(Object.keys(req.query).length == 0 ||
        req.query.username == undefined ||
        req.query.password == undefined) res.status(500).send("Ha ha..");

    const username = req.query.username.toString().trim();
    const pass = req.query.password.toString().trim();

    console.log('pass is '+pass);
    if(username.length == 0 || username.includes(' ')){
        res.send("Please enter correct Username");
    }
    else if(check_username(username)){
        
        if(authorize_user(username, pass)){
            res.send(`Welcome ${username}`)
        }
        else{
            res.send('Incorrect password');
        }
    }
    else{
        res.status(404).send("Username not found");
    }

});

app.get('/sign-up', (req, res)=>{

    if(Object.keys(req.query).lenght == 0) res.send('Please enter username and password');
    
    const username = req.query.username.toString().trim();
    const password = req.query.password.toString().trim();

    const result = CreateNewUser(username, password);
    if(result) res.send('Please login using newly created username and password');
    else res.send('Username already existed');
})
app.get('*', (req, res)=>{
    res.status(404).send("Page Not Found");
})