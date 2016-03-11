var object = {
    "property1": "This is a value",
    "property2": "This is another",
    "another": {
        "prop3": "This is 2 layers inside"
    }
}
var user = {
    "username": "user1",
    "password": "password1234"
}

var users=[
    {
        "username": "user0",
        "password": "pass0"    
    },
    {
        "username": "user1",
        "password": "pass1"    
    },
    {
        "username": "user2",
        "password": "pass2"    
    }
]

console.log(user.username);
console.log(users[0].password);
//console.log(object.another.prop3);