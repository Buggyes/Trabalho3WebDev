function login(){
    let username = document.getElementById("usernameInput").value;
    let password = document.getElementById("passwordInput").value;

    if(username == 'admin' && password == 123){
        document.location.replace('http://127.0.0.1:5500/management.html');
    }
}