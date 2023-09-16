const fs = require('fs');
const pool = require('../pg');

module.exports = {
    AuthorizeUser:async(username, pass) =>{
        
        const res = await pool.query(`select password from users where username='${username}'`);
        
        //Username or password not properly formatted
        if(username.length == 0 
            || username.includes(' '
            || username.length == 0
            || username.includes(' '))){
            return [false, "Please enter correct Username"];
        }
        
        //Checking if username exists
        if(res.rowCount == 0){
            return [false, "username does not exist"];
        }

        //Checking if password is correct
        //There should be no case for more than one unique
        //username
        else if(res.rowCount == 1){
            if(res.rows[0].password == pass){
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