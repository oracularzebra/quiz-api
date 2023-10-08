const pool = require("../pg");

async function getResult(
    questions_id,
    marked_options
){
    if(questions_id == undefined ||
        marked_options == undefined) return [false, 
        "Something is wrong !"]
    if(questions_id.length == 0) return [false, 0];
    if(marked_options.length == 0) return [true, 0];

    //we will select 
    console.log(JSON.parse(questions_id));
    console.log(marked_options);
    return [true, []];
}
module.exports = getResult;