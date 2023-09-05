const fs = require('fs');
const pool = require('./pg');

module.exports = {

    CreateNewUser: async(username, password) => {

    const queryRes = await pool.query(`select username from users where username='${username}'`)
    
    if(queryRes.rows.length == 0){
        const res = pool.query(`insert into users (username, password) values ('${username}', '${password}')`)
        return true;
    }
    else if(queryRes.rows.length >= 1){
        return false;
    }
    }
}