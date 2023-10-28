const pool = require("../pg");

async function getLeaders(category, difficulty){

  //scale_factor is a constant that we can choose
  //based on how much weight or importance we want
  //to assign to the duration factor relative to the
  //marks factor in our combined score calculation
  //If scale_factor is high it means the duration
  //will have a minimal effect on the combined score
  //and the leaderboard will be primarily based on 
  //marks, Conversely if we low the scale factor
  //the duration will have a significant impact on
  //the combined score, potentially leading to users
  //who completed the test quickly but with lower marks
  //to have a higher combined score.
  const scale_factor = 50; 
  const username_marks = new Map();
  console.log(category, difficulty)
  const result = await pool.query(`
    select
    distinct (username),
    marks,
    duration
    from attempts
    where category='${category}' and difficulty='${difficulty}'
  `)
  const newRes = result.rows.map(res => {
    const duration = res.duration.replaceAll('\'', '')
    const sliced_duration = duration.slice(1, duration.length-1);
    const duration_obj = JSON.parse(sliced_duration);
    const total_duration_in_sec = duration_obj.min * 60 + duration_obj.sec;
    return {username: res.username,
            marks: res.marks,
            duration: duration_obj,
            combined_score: res.marks - (total_duration_in_sec/scale_factor)}
  })
  let compare = (a,b)=>{
    if(a.combined_score <= b.combined_score) return -1;
    if(a.combined_score > b.combined_score) return 0;
  }
  const sortedRes = newRes.sort(compare).reverse();
  console.log(sortedRes);
  if(result.rowCount > 0) return [true, sortedRes]
  else return [false, []];
}
module.exports = getLeaders;