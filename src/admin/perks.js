const pool = require("../pg")

module.exports = {
  
  getNoOfUsers : async()=>{
  const result = await pool.query(`select count(username) from users;`)
  if(result.rowCount == 1) {
    console.log(result.rows[0].count);
    return [true, result.rows[0].count]
  }
  else return [false, 0];
  }
}