const pool = require("../pg");

async function getLeaders(category, difficulty){

  //scale_factor is a constant that we can choose
  //based on how much weight or importance we want
  //to assign to the duration factor relative to the
  //marks factor in our combined score calculation
  const scale_factor = 50; 
  const username_marks = new Map();
  const result = await pool.query(`
    select username,marks
    from attempts
    where category='${category}' and difficulty='${difficulty}'
  `)

}
module.exports = getLeaders;