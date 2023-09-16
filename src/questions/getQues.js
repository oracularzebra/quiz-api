const pool = require("../pg");

async function getQues(quesCat, quesType, quesDifficulty, noOfQues=10){
    
    const res = await pool.query(`select * from questions TABLESAMPLE BERNOULLI (20)    
        where category='${quesCat}' 
        and type='${quesType}'
        and difficulty='${quesDifficulty}'
        limit ${noOfQues};
        `);
    return res.rows;
}
module.exports = getQues;