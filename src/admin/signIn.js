const pool = require("../pg");

async function AdminSignIn(
  username,
  password
){
  if(username == undefined 
            || password == undefined
            || username.length == 0 
            || username.length == 0
            || username.includes(' ')){
            return [false, "Please enter correct Username and password"];
        }
  const formattedUsername = username.trim();
  const formattedPassword = password.trim();
  if(formattedUsername.length == 0 
  || formattedPassword.length == 0){
      return [false, "Please enter correct username and password"]
  }
  else{
    const res = await pool.query(`
    select username,password from admins
    where username='${formattedUsername}' and password='${formattedPassword}';
    `)
    if(res.rowCount == 1){
      return [true, "Welcome"]
    }
    else{
      return [false, "Username or password wrong"]
    }
  }
}
module.exports = AdminSignIn;