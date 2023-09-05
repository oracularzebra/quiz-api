//Here we'll store all the questions and its hashes in the posgres database

const pool = require("./pg");
const fs = require("fs");

/**
 * 
INSERT INTO sal_emp
    VALUES ('Carol',
    '{20000, 25000, 25000, 25000}',
    '{{"breakfast", "consulting"}, {"meeting", "lunch"}}');
 */

fs.readFile('src/db/questions.json', {encoding: 'utf-8', flag:'r'}, (err, data)=>{
    
    const dataInJson = JSON.parse(data);
    dataInJson.reverse().forEach(quesObj => {
        // console.log(quesObj);
        //formatting incorrect answers
        
        const incorrect_answers = quesObj.incorrect_answer;
        const formatedIncorrect_answers = JSON.stringify(incorrect_answers).replace("[", "'{").replace("]", "}'").replaceAll('"', '');
        console.log(formatedIncorrect_answers);

        try{
        pool.query(
            `insert into questions (
                hash ,
                category, 
                type, 
                difficulty, 
                ques, 
                correct_answer, 
                incorrect_answers
            )
            values (
                '${quesObj.hash}',
                '${quesObj.category}',
                '${quesObj.type}',
                '${quesObj.difficulty}',
                '${quesObj.question}',
                '${quesObj.correct_answer}',
                ${formatedIncorrect_answers}
            )
        `).catch(e=>{console.log(e)})
        }
        catch(e){
            console.log(e)
        }
    })
});

