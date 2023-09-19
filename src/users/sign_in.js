const fs = require('fs');
const pool = require('../pg');

module.exports = {
    AuthorizeUser:async(username, pass) =>{
        //Username or password not properly formatted
        if(username == undefined 
            || pass == undefined
            || username.length == 0 
            || username.length == 0
            || username.includes(' ')){
            return [false, "Please enter correct Username and password"];
        }
        const formattedUsername = username.trim();
        const formattedPassword = pass.trim();
        if(formattedUsername.length == 0 
        || formattedPassword.length == 0){
            return [false, "Please enter correct username and password"]
        }
        const res = await pool.query(`select password from users where username='${formattedUsername}'`);
        
        
        //Checking if username exists
        if(res.rowCount == 0){
            return [false, "username does not exist"];
        }

        //Checking if password is correct
        //There should be no case for more than one unique
        //username
        else if(res.rowCount == 1){
            if(res.rows[0].password == formattedPassword){
            return [true, 'welcome '+username];
            }
            else{
                return [false, 'wrong password']
            }
        }
       else {
            return [false, 'Please enter correct username or password'];
        }
    }
}