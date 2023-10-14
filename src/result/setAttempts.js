const pool = require("../pg")

 async function setAttempts(
    questions_id,
    marked_options,
    duration,
    username,
    marks,
    category,
    difficulty
){
    // console.log(questions_id)
    // console.log(marked_options)
    // console.log(duration)
    // console.log(username)

    const parsed_questions_id = JSON.stringify(questions_id)
    .replace('[', '\'{')
    .replace(']', '}\'')
    .replaceAll('"', '')
    .replaceAll('\\','')
    const parsed_marked_options = JSON.stringify(marked_options)
    .replace('[', '\'{')
    .replace(']', '}\'')
    .replaceAll('"', '')
    .replaceAll('\\','')
    const parsed_duration = JSON.stringify(duration)
    .replaceAll('\\','');

    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

    const isttime = new Date()
    pool.query(`insert into attempts (
        username,
        attempt_date,
        duration,
        questions_id,
        marked_answers,
        marks,
        category,
        difficulty
    ) values (
        '${username}',
        '${ISTTime}',
        '${parsed_duration}',
        ${parsed_questions_id},
        ${parsed_marked_options},
        '${marks}',
        '${category}',
        '${difficulty}'
    )`)
    
}
module.exports = setAttempts;