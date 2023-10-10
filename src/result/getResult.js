const pool = require("../pg");

async function getResult(
    questions_id,
    marked_options
){
    if(questions_id == undefined ||
        marked_options == undefined) return [false, 
        "Something is wrong !"]
    if(questions_id.length == 0) return [false, 0];
    if(marked_options.length == 0) return [true, 0];

    const parsed_questions_id = JSON.parse(questions_id);
    const parsed_marked_options = JSON.parse(marked_options);
    let marks = 0;
    let index = 0;
    for (id of parsed_questions_id){
        const correct_answer_req = await pool.query(`select correct_answer from answers where id=${id};`);
        const correct_answer = correct_answer_req.rows[0].correct_answer;
        const marked_option = parsed_marked_options[index++];

        if(correct_answer == marked_option){ 
            marks += 1;
        }
    }

    return [true, marks];
}
module.exports = getResult;