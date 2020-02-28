const {ipcRenderer} = require('electron')

function openAPP (btn_element){  
    ipcRenderer.send('open-app',btn_element.id)
}

function login (){
    ipcRenderer.send('login-launcher',{username : input_username.value,password : input_password.value })
}

ipcRenderer.on('reply-open-app',  (event, args_JSON) => {    
    console.table(args_JSON);
})

ipcRenderer.on('reply-close-app',  (event, args_JSON) => {
    console.table(args_JSON);
})

ipcRenderer.on('reply-login-launcher',  (event, args_JSON) => {
    console.table(args_JSON);
});

