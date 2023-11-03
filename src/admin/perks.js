const pool = require("../pg")

module.exports = {
  
  getNoOfUsers : async()=>{
  const result = await pool.query(`select count(username) from users;`)
  if(result.rowCount == 1) {
    return [true, result.rows[0].count]
  }
  else return [false, 0];
  },
  addQuesAndOptions: async(
    question,
    options
  )=>{
    console.log(question, options)
  }
}