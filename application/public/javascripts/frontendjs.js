function logoutClick(event) {
    
    var fetchOptions = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let fetchURL = 'http://localhost:3000/users/logout';
    fetch(fetchURL, fetchOptions)
    .then((data) => {
        console.log(data);
        let logButton = document.getElementById('authenticate-button');
        logButton.innerHTML = "Log In";
        logButton.setAttribute('href', '/login');
        logButton.onclick = null;
    }).catch((err) => location.reload());
}

if(document.cookie.includes('csid')){
    console.log('user is logged in');
    let logButton = document.getElementById('authenticate-button');
    logButton.innerHTML = "Log Out";
    logButton.removeAttribute('href');
    logButton.onclick = logoutClick;
}else{
    let logButton = document.getElementById('authenticate-button');
    logButton.innerHTML = "Log In";
    logButton.setAttribute('href', '/login');
}