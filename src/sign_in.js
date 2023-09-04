const fs = require('fs');

module.exports = {

    SearchUsername:(username)=>{

        console.log("Seaching username", username);
        const UserdbFile=fs.readFileSync('./db/usersDB.json', {encoding:'utf-8', flag:'r'});
        const Userdb = JSON.parse(UserdbFile);

        console.log("username is ", username);
        return Userdb.includes(username);
    },

    AuthorizeUser:(username, pass) =>{
        
        const user_pass_file = fs.readFileSync('./db/Us_pass.json', {encoding:'utf-8', flag:'r'});
        const passdb = JSON.parse(user_pass_file);

        return passdb[username] == pass;
    }
}