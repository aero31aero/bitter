var container = document.getElementsByClassName('container')[0],
    close = document.getElementsByClassName('close')[0],
    toggle = document.getElementsByClassName('toggle')[0],
    buttons = container.getElementsByTagName('button'),
    main = document.getElementById('main'),
    sidebar = document.getElementById('sidebar'),
    searchbar = document.getElementById('searchbar'),
    list_counter = -1,
    retainTagOptions = 0,
    groupTagHolder = null;
document.getElementById('name').value = "";
document.getElementById('bitsid').value = "";
document.getElementById('password').value = "";

function loadToasterOptions() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "100",
        "timeOut": "10000",
        "extendedTimeOut": "0",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"

    }
};
loadToasterOptions();
var curuserid = 0;
var curusername = null;
var curpostnum = 0;

//getXMLHTTPrequest
function getRequest() {
    var request = new XMLHttpRequest();
    return request;
}

//function for signup dialog box to open
toggle.onclick = function () {
    container.classList.add('active');
    toggle.innerHTML = "";

}

//function for signup dialog box to close
close.onclick = function () {
    container.classList.remove('active');
    //toggle.innerHTML="&#9998;";
    toggle.innerHTML = "person_add";
}

//set sidebar height to window height

//set the posts wrapper height to window height
document.body.onload = function () {
    /*window.scrollTo(0,0);*/
    window.scrollTop = 0;

    document.getElementById('wrapper').style.height = window.innerHeight;
}

//update sidebar and posts wrapper heights on window resize
window.onresize = updateSize;

function updateSize() {
    document.getElementById('wrapper').style.height = window.innerHeight;
}

var idclicked = null;
//for (var i = 0; i < buttons.length; i++) {
//    idclicked=buttons[i].getAttribute('id');
//    //console.log(buttons[i].getElementById('regbutt').toString);
//    
//    buttons[i].onclick=bringmain;
//    
//};
buttons[1].onclick = register;
buttons[0].onclick = login;

function register() {
    var request = getRequest();
    var username = document.getElementById('name').value;
    var bitsid = document.getElementById('bitsid').value;
    var password = document.getElementById('password').value;
    if (validatereg(username, bitsid, password) != "fail") {

        var user = {
            "username": username,
            "password": password,
            "bitsid": bitsid
        }
        request.open("POST", "/users");
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("Connection", "close");
        request.send(JSON.stringify(user));
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                if (request.responseText == "success") {
                    toastr.success('You have been registered as ' + username + '.', 'Registration Successful');
                    container.classList.remove('active');
                    //toggle.innerHTML="&#9998;";
                    toggle.innerHTML = "person_add";
                    document.getElementById('Username').value = username;
                }
                if (request.responseText == "fail") {
                    toastr.error('This username is already taken.', 'Username Taken');
                }
            }
        }
    };

}

function validatereg(username, bitsid, password) {
    var nameRegex = /^[a-zA-Z\-\d]+$/;
    var bitsidRegex = /[fh](20)\d{5}/g;
    var validfirstUsername = username.match(nameRegex);
    var validbitsid = bitsid.match(bitsidRegex);
    if (validfirstUsername == null) {
        //        swal({
        //              title: "Oops!",
        //              text: "I'm sorry but the username you entered is invalid. Please make sure it contains only alphabets and numbers.",
        //              type: "error",
        //              confirmButtonText: "Okay!"
        //        });
        toastr.error('Please use alphabets and numbers.', 'Username Invalid');
        return "fail";
    }
    if (validbitsid == null || bitsid.length != 8) {
        //        swal({
        //              title: "Oops!",
        //              text: "I'm sorry but the username you entered is invalid. Please make sure it contains only alphabets and numbers.",
        //              type: "error",
        //              confirmButtonText: "Okay!"
        //        });
        toastr.error('Please enter the ID in the format mentioned.', 'Bits ID Invalid');
        return "fail";
    }
    if (password.length < 8 || password.length > 40) {
        //        swal({
        //             title: "Oops!",
        //             text: "I'm sorry but the password you entered is too short. .",
        //             type: "error",
        //             confirmButtonText: "Okay!"
        //        });
        toastr.error('Enter a password between 8 and 40 characters.', 'Password Invalid');
        return "fail";
    }


    return "shit";
}

function onpasspress(e) {
    if (e.keyCode === 13) {
        login();
    }

    return false;
}

function onpasspress2(e) {
    if (e.keyCode === 13) {
        register();
    }

    return false;
}

function login() {
    var request = getRequest();
    var username = document.getElementById('Username').value;
    var password = document.getElementById('Password').value;
    var user = {
        "username": username,
        "password": password
    }
    request.open("POST", "/users/search/authenticate");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("Connection", "close");
    request.send(JSON.stringify(user));
    request.onreadystatechange = function () {

        if (request.readyState == 4 && request.status == 200) {
            if (request.responseText != "fail") {

                curuserid = JSON.parse(request.responseText)[0]._id;
                console.log(curuserid);
                curusername = username;
                //setusercookie(request.responseText);

                bringmain();
                toastr.success('You have been logged in as ' + username + '.', 'Authentication Successful');

            } else {
                toastr.error('Please check your username and password.', 'Authentication Failed');
            }
        }
    };
}

function bringmain() {
    //check validation before executing here
    //alert("moreshit");
    //if(main.getAttribute('id')='regbutt'){
    //    alert('shit happened');
    //}
    main.classList.remove('hidden-element');
    main.classList.add('shown-element');
    main.classList.add('active');
    document.getElementById('loginpage').classList.add('hidden-element')
    document.getElementById('usernamebar').innerHTML = "Logged in to Bitter as: " + curusername;
    window.setTimeout(function () {
        document.getElementById('open_composer').style.display = 'block';
        document.getElementById('button_drawer').style.display = 'block';
    }, 1000);
    loadbitts();
}

function countbitts() {
    var request = getRequest();
    request.open("GET", "/bitts/posts/count");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("Connection", "close");
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            if (request.responseText != "fail") {
                console.log(request.responseText.substr(6));
                if (request.responseText.substr(6) > curpostnum) {
                    loadbitts();
                    curpostnum = request.responseText.substr(6);
                }



                //setusercookie(request.responseText);



            } else {

            }
        }
    };
}

function loadbitts() {
    var request = getRequest();
    request.open("GET", "/bitts");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("Connection", "close");
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var postw = document.getElementById('post_wrapper');
            postw.innerHTML = "";
            if (request.responseText != "fail") {
                for (var pc = JSON.parse(request.responseText).length - 1; pc >= 0; pc--) {
                    postid = JSON.parse(request.responseText)[pc]._id;
                    username = JSON.parse(request.responseText)[pc].username;
                    postcontent = JSON.parse(request.responseText)[pc].bittcontent;
                    posttime = JSON.parse(request.responseText)[pc].updated_at;
                    postheader = JSON.parse(request.responseText)[pc].bittheader;
                    postw.innerHTML = postw.innerHTML + "<li class=\"post\"> <div class = \"postcontent\"><span class=\"details\"><span class=\"author\">" + username + "</span><span class=\"date\">" + posttime + "</span><span class=\"group\">" + postheader + "</span></span> <div class = \"message\">" + postcontent + "</div><p></p><p></p></div></li>";
                }



                //setusercookie(request.responseText);



            } else {

            }
        }
    };
}


function logout() {
    location.reload();
}

function openfaq() {
    swal({
        title: "We're Bitter, not Twitter",
        text: 'Bitter is a simple Twitter alternative for LAN.',
        html: true,
        animation: "slide-from-bottom",
        confirmButtonColor: "#00563a"

    });
}
var opennewpost = function () {
    swal({
            title: "Create new Bitt",
            type: "input",
            inputType: "text",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-bottom",
            "confirmButtonColor": "#00563a",
            inputPlaceholder: "Say what you wanna say..."
        },
        function (inputValue) {
            if(inputValue==null){
                toastr.error('Type some stuff, at least.', 'Oops.');
                return 0;
            }
            if(inputValue==false){
                //toastr.error('Some weird shit just took place.', 'Oops.');
                return 0;
            }
            var request = getRequest()
            var bitt = {
                "username": curusername,
                "bittcontent": inputValue,
                "bittheader": "workshop"
            }
            request.open("POST", "/bitts");
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.setRequestHeader("Connection", "close");
            request.send(JSON.stringify(bitt));
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    if (request.responseText != "success") {
                        toastr.success('Successfully posted new Bitt.', 'Congratulations');
                    }
                    if (request.responseText == "fail") {
                        toastr.error('Some weird shit just took place.', 'Oops.');
                    }
                }
            }

        });
};

t = 0;
window.setInterval(function () {
    //console.log(t++);
    // TODO Insert refresh code here.
    countbitts();
}, 1000)
