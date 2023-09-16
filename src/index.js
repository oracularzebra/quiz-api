const express = require("express");
const { CreateNewUser } = require("./users/sign_up");
const authorize_user = require('./users/sign_in').AuthorizeUser;
const getQues = require('./questions/getQues');

const app = express();
const port = 9001;


app.listen(port, ()=>{
    console.log(`Host is listening on port ${port}`);
});
app.get('/', (req,res)=>{
    res.send("Working... on port 9001");
});
app.post('/sign-in', async(req, res)=>{

    const {username, password} = req.headers;
    console.log(username, password)
    const result = await authorize_user(username, password);
    res.send({success:result[0],message:result[1]});

});

app.post('/sign-up', async(req, res)=>{

    const {username, password} = req.headers;
    const result = await CreateNewUser(username, password);
    res.send({sucess:result[0], message:result[1]});
})

app.get('/questions', (req, res)=>{
    
    const {category, type, difficulty, noofQues} = req.headers;
    getQues(category, type, difficulty,noofQues)
    .then(result => {
        result.length > 0 ? res.send(result)
        : res.send(['Not found'])
        })
    .catch(e => console.log(e))
})
app.get('*', (req, res)=>{
    res.status(404).send("Page Not Exist");
})