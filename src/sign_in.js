const fs = require('fs');
const pool = require('./pg');

module.exports = {
    AuthorizeUser:async(username, pass) =>{
        
        const res = await pool.query(`select password from users where username='${username}'`);
        
        if(res.rowCount == 0){
            return [false, "username does not exist"];
        }
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