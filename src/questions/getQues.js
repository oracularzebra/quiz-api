const pool = require("../pg");

async function getQues(quesCat, quesType, quesDifficulty, noOfQues=10){
    
    let questions = [];
    let fetched_ids = [];
    let tries_limit = noOfQues;
    for(let i=0;i<noOfQues;){
        const res = await pool.query(`select id,question,options from questions 
        where sub_category='${quesCat}' 
        and type='${quesType}'
        and difficulty='${quesDifficulty}'
        order by random()
        limit 1;
        `);
        if(!fetched_ids !== null && !fetched_ids.includes(res.rows[0].id)){
           fetched_ids.push(res.rows[0].id);
           questions.push(...res.rows);
           i++;
        }
        else if(tries_limit-- == 0) break;
    }
    if(questions.length > 0) return [true, questions];

    return [false, []]
}
// getQues('Music', 'multiple', 'easy');
module.exports = getQues;