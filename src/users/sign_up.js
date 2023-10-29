const fs = require('fs');
const pool = require('../pg');

module.exports = {

    CreateNewUser: async(username, password) => {

    //Usename or password not properly formated
    if(username == undefined
        || password == undefined 
        || username.length == 0 
        || password.length == 0
        || username.includes(' ')){
        return [false, "Please enter correct Username or password"];
    }
    const formattedUsername = username.trim();
    const formattedPassword = password.trim();
    if(formattedUsername.length == 0 
        || formattedPassword.length == 0){
            return [false, "Please enter correct username and password"]
    }
    if(formattedPassword < 3 || formattedPassword.length > 10){
      return [false, "Password should be between 3 to 10 charactes long"]
    }
    if(formattedUsername < 3 || formattedUsername.length > 10){
      return [false, "Username should be between 3 to 10 charactes long"]
    }
    const queryRes = await pool.query(`select username from users where username='${username}'`)
    
    //User does not exist
    if(queryRes.rows.length == 0){
        const res = await pool.query(`insert into users
        (username, 
        password, 
        registrationdate) 
        values ('${formattedUsername}',
        '${formattedPassword}', 
        to_timestamp(${Date.now()} / 1000.0)
        )`)
        return [true, "Please login using newly created username and password"];
    }
    //User already exists
    else if(queryRes.rows.length >= 1){
        return [false, "Username already exist please try something different"];
    }
    }
}