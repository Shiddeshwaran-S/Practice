function user(name, email, password){
    this.name = name;
    this.email = email;
    this.password = password;
};

user.prototype.login = function(){
    console.log(this.email, 'has logged in');
};

user.prototype.logout = function(){
    console.log(this.email, 'has logged out');
};

const user1 = new user("shiddesh", "shiddesh@email.com", "1234");

console.log(user1);