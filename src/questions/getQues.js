const pool = require("../pg");

async function getQues(quesCat, quesType, quesDifficulty, noOfQues=10){
    
    const res = await pool.query(`select * from questions TABLESAMPLE BERNOULLI (20)    
        where category='${quesCat}' 
        and type='${quesType}'
        and difficulty='${quesDifficulty}'
        limit ${noOfQues};
        `);
    
    console.log(res.rows.length)
    if(res.rows.length > 0) return [true, res.rows];

    return [false, res]
}
module.exports = getQues;