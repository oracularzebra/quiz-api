const fs = require('fs');

const CheckIfUserAlreadyExists = (username) =>{
    const usernameFile = fs.readFileSync('./db/usersDB.json', {encoding:'utf-8', flag:'r'});

    const usernames = JSON.parse(usernameFile);

    return usernames.includes(username);
};

const addNewUser = (username, password) => {

    try{
        //Adding username in usernames file
        const usernameFile = fs.readFileSync('./db/usersDB.json', {encoding:'utf-8', flag:'r'});

        const usernames = JSON.parse(usernameFile);

        usernames.push(username);

        const newUsersList = JSON.stringify(usernames);

        fs.writeFileSync('./db/usersDB.json', newUsersList);

        //Adding uesrname and password in Us_pass.db file
        const usrenameDBFile = fs.readFileSync('./db/Us_pass.json', {encoding:'utf-8', flag:'r'});

        const usernameDB = JSON.parse(usrenameDBFile);

        const newUserObj = {
            username: username,
            password: password
        };

        usernameDB.push(newUserObj);

        const newUsersDB = JSON.stringify(usernameDB);
        fs.writeFileSync('./db/Us_pass.json', newUsersDB);
        return true;
    }
    catch(E){return false}

}
module.exports = {
    
    CreateNewUser: (username, password)=>{
        
        if(!CheckIfUserAlreadyExists(username)){
            return addNewUser(username, password);
        }
        else{
            return false;
        }
    }
};
