const express = require("express");
const { CreateNewUser } = require("./users/sign_up");
const { AuthorizeUser } = require('./users/sign_in');
const getQues = require('./questions/getQues');
const cors = require('cors');
const { getSubCategory, getCategory } = require("./questions/getCategory");
const getResult = require("./result/getResult");

const app = express();
const port = 9001;
const allowedDomains = ['http://localhost:5173', 'https://*.quiz-webapp-typescript.pages.dev']
app.listen(port, ()=>{
    console.log(`Host is listening on port ${port}`);
});

app.use(cors({
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);
 
    if (allowedDomains.indexOf(origin) === -1) {
      var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.get('/', (req,res)=>{
    res.send("Working... on port 9001");
});
app.get('/sign-in', async(req, res)=>{

    const {username, password} = req.headers;
    console.log(username, password)
    const result = await AuthorizeUser(username, password);
    res.send({success:result[0],message:result[1]});

});
app.post('/result', async(req, res)=>{
    const {questions_id, marked_options} = req.headers;
    const result = await getResult(questions_id, marked_options);
    res.send({success:result[0], data:{marks:result[1], 
                                       correct_marked_questions_id:result[2]}})
})
app.post('/sign-up', async(req, res)=>{

    const {username, password} = req.headers;
    const result = await CreateNewUser(username, password);
    res.send({sucess:result[0], message:result[1]});
})
app.get('/questions', async(req, res)=>{
    
    const {category, type, difficulty, noofques} = req.headers;
    const result = await getQues(category, type, difficulty, noofques)
    res.send({success:result[0], data:result[1]});
})
app.get('/categories', async(req, res)=>{
    if(req.headers['sub_category']){
        const result = await getSubCategory(req.headers['sub_category']);
        res.send({success:result[0], data:result[1]})
    }
    else{
        const result = await getCategory();
        res.send({success:result[0], data:result[1]});
    }
})
app.get('*', (req, res)=>{
    res.status(404).send("Page Not Exist");
})