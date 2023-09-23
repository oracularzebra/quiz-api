const pool = require("../pg");

async function getQues(quesCat, quesType, quesDifficulty, noOfQues=10){
    
    console.log(quesCat, quesType, quesDifficulty);
    const res = await pool.query(`select id,question,options from questions 
        where sub_category='${quesCat}' 
        and type='${quesType}'
        and difficulty='${quesDifficulty}'
        order by random()
        limit ${noOfQues};
        `);
    
    console.log(res.rows)
    if(res.rows.length > 0) return [true, res.rows];

    return [false, []]
}
// getQues('Music', 'multiple', 'easy');
module.exports = getQues;