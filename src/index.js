const express = require("express");
const { CreateNewUser } = require("./users/sign_up");
const { AuthorizeUser } = require('./users/sign_in');
const getQues = require('./questions/getQues');
const cors = require('cors');
const { getSubCategory, getCategory } = require("./questions/getCategory");
const getResult = require("./result/getResult");
const getAttempts = require("./result/getAttempts");
const getAttempt = require("./result/getAttempt");
const getLeaders = require("./result/getLeaders");
const AdminSignIn = require("./admin/signIn");
const perks = require("./admin/perks");

const app = express();
const port = 9001;
const allowedDomains = ['http://localhost:5173', 'https://quiz-webapp-typescript.pages.dev', 'https://quiz-app-6701.onrender.com']
app.listen(port, () => {
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
app.get('/', (req, res) => {
  res.send("Working... on port 9001");
});
app.get('/sign-in', async (req, res) => {

  const { username, password } = req.headers;
  console.log(username, password)
  const result = await AuthorizeUser(username, password);
  res.send({ success: result[0], message: result[1] });

});
app.post('/result', cors(), async (req, res) => {
  const { questions_id, marked_options, duration, username, category, difficulty } = req.headers;
  const result = await getResult(questions_id, marked_options, duration, username, category, difficulty);
  res.send({
    success: result[0], data: {
      marks: result[1],
      correct_marked_questions_id: result[2],
      correct_answers: result[3],
      duration: result[4],
      questions: result[5],
      category: result[6],
      difficulty: result[7]
    }
  })
})
app.post('/sign-up', async (req, res) => {

  const { username, password } = req.headers;
  const result = await CreateNewUser(username, password);
  res.send({ sucess: result[0], message: result[1] });
})
app.get('/questions', async (req, res) => {

  const { category, type, difficulty, noofques } = req.headers;
  const result = await getQues(category, type, difficulty, noofques)
  res.send({ success: result[0], data: result[1] });
})
app.get('/categories', async (req, res) => {
  if (req.headers['sub_category']) {
    const result = await getSubCategory(req.headers['sub_category']);
    res.send({ success: result[0], data: result[1] })
  }
  else {
    const result = await getCategory();
    res.send({ success: result[0], data: result[1] });
  }
})
app.get('/getAttempts', async (req, res) => {
  const username = req.headers['username']
  const result = await getAttempts(username);
  res.send({ success: result[0], data: result[1] });
})
// app.get('getAttempt', async(req, res)=>{
//     const username = req.headers['username']
// })
app.post('/getAttempt', cors(), async (req, res) => {
  const { questions_id, marked_options, duration, category, difficulty } = req.headers;
  const result = await getAttempt(questions_id, marked_options, duration, category, difficulty);
  res.send({
    success: result[0], data: {
      marks: result[1],
      correct_marked_questions_id: result[2],
      correct_answers: result[3],
      duration: result[4],
      questions: result[5],
      category: result[6],
      difficulty: result[7]
    }
  })
})
app.get('/getLeaders', async(req, res)=>{
  const {category, difficulty} = req.headers;
  const result = await getLeaders(category, difficulty);
  res.send({success: result[0], data:result[1]});
})
app.get('/admin/sign-in', async(req, res)=>{
  const {username, password} = req.headers;
  const result = await AdminSignIn(username, password)
  res.send({success: result[0], message: result[1]});
})
app.get('/admin/get-users', async(req, res)=>{
  const result = await perks.getNoOfUsers();
  res.send({success:result[0], data:result[1]})
})
app.get('/admin/add-question', async(req, res)=>{
  const {question, options} = req.headers;
  const result = await perks.addQuesAndOptions(question, options)
})
app.get('*', (req, res) => {
  res.status(404).send("Page Not Exist");
})