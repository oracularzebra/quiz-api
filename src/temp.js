//Here we'll fetch the questions and their answers from open trivia and mark 
//creating md5 hash of the questions and by this way managing all the questions
const md5 = require('md5');
const fs = require('fs');

const axios = require('axios');

async function getQues(){

    const allQues = [];
    const ques_hashes = [];
    axios.get("https://opentdb.com/api.php?amount=50").then(res=>{
        if(res.data.response_code == 0){
            for (let i=0;i<50;i++){
                const obj = res.data.results[i];
                const hash = md5(obj.question).replace("'", "\"");;
                ques_hashes[i] = hash;
                const data = {
                    hash:hash,
                    category:obj.category, 
                    type:obj.type,
                    difficulty:obj.difficulty,
                    question:obj.question,
                    correct_answer:obj.correct_answer,
                    incorrect_answer:obj.incorrect_answers
                }
                allQues[i] = data;   
            }
            const nonExist = checkForNonExistingQues(ques_hashes); 
            saveQues(allQues,nonExist);
            // console.log(JSON.stringify(ques_hashes));
            // console.log(JSON.stringify(allQues));
        }
        else{
            [false, null, null];
        }   
    });    
};
//This function will return non existing questions hashes
function checkForNonExistingQues(new_ques_hashes){

    const ques_hashes_file = fs.readFileSync('src/db/quesHash.json', {encoding: 'utf-8', flag:'r'});
    const old_ques_hashes = JSON.parse(ques_hashes_file);

    const nonExist = []

    // console.log(new_ques_hashes)
    for(let i = 0;i<new_ques_hashes.length;i++){
        if(!old_ques_hashes.includes(new_ques_hashes[i])){
            // console.log(new_ques_hashes[i])
            nonExist.push(new_ques_hashes[i])
        }
    }

    //Now we'll write non-existing hashes to quesHash.json file

    const all_ques_hashes = [...old_ques_hashes, ...nonExist];
    fs.writeFileSync('src/db/quesHash.json', JSON.stringify(all_ques_hashes));
    return nonExist;
}
function saveQues(ques, nonExistingQuesHashes){

    //Here we'll add the ques with hashes equal to nonExistingQuesHashes
    const newQuesObjs = [];
    for(let i=0;i<ques.length;i++){
        if(nonExistingQuesHashes.includes(ques[i].hash)){
            newQuesObjs.push(ques[i]);
        }
    }
    const quesFile = fs.readFileSync('src/db/questions.json', {encoding:'utf-8', flag:'r'});
    const old_questions = JSON.parse(quesFile);
    console.log(old_questions);

    const all_questions = [...old_questions, ...newQuesObjs];
    // console.log(newQuesObjs.length);
    console.log(all_questions);
    console.log(all_questions.length);

    //Now we'll questions to questions.json file
    fs.writeFileSync('src/db/questions.json', JSON.stringify(all_questions));
}
// getQues();

//Checking database
