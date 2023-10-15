const pool = require("../pg");
//This will return the ids of those
//questions which are marked correctly.
async function getAttempt(
    questions_id,
    marked_options,
    duration,
    category,
    difficulty
){
    if(questions_id == undefined ||
        marked_options == undefined) return [false, 
        "Something is wrong !"]
    if(questions_id.length == 0) return [false, 0];
    if(marked_options.length == 0) return [true, 0];

    const parsed_questions_id = JSON.parse(questions_id);
    const parsed_marked_options = JSON.parse(marked_options);
    let marks = 0;
    let correct_marked_questions_id = [];
    let correct_answers = [];
    const questions = [];
    let index = 0;
    for (id of parsed_questions_id){
        const correct_answer_req = await pool.query(`select correct_answer from answers where id=${id};`);
        const correct_answer = correct_answer_req.rows[0].correct_answer;
        const marked_option = parsed_marked_options[index++];
        correct_answers.push(correct_answer);
        if(correct_answer == marked_option){ 
            marks += 1;
            correct_marked_questions_id.push(id);
        }
        const res = await pool.query(`select id,question,options from questions 
        where id=${id}
        `);
        questions.push(res.rows[0]);
    }
    //We will call setAttempts here only
    //We will also send back the correct answers
    return [true, marks, correct_marked_questions_id, correct_answers, JSON.parse(duration), {success:true, data:questions}, category, difficulty];
}
module.exports = getAttempt;