const pool = require("../pg")

async function getAttempts(username){

    const parsed_username = JSON.parse(username);
    if(parsed_username != null && parsed_username != undefined){
        const result = await pool.query(
            `select * from attempts
            where username='${parsed_username}';`
        )
        return [true, result.rows];
    }
    else{
        return [false, 'Please login again'];
    }
}
module.exports = getAttempts;