const FilterUsernamePassword = (username, password)=>{

    if(username == undefined || password == undefined) return false;

    const filtered_username = username.toString().trim();
    const filtered_password = password.toString().trim();

    return [filtered_username, filtered_password];
}
