const {ipcRenderer} = require('electron')

function login (){
    ipcRenderer.send('login-launcher',{userName : input_userName.value,password : input_password.value })
}

function openAPP (btn_element){  
    ipcRenderer.send('open-app',btn_element.id)
}

function logout() {
    ipcRenderer.send('logout-launcher')
}

ipcRenderer.on('reply-login-launcher',  (event, args_JSON) => {
    console.table(args_JSON);
});

ipcRenderer.on('reply-open-app',  (event, args_JSON) => {    
    console.table(args_JSON);
})

ipcRenderer.on('reply-close-app',  (event, args_JSON) => {
    console.table(args_JSON);
})

ipcRenderer.on('reply-logout-launcher',  (event, args_JSON) => {
    console.table(args_JSON);
});