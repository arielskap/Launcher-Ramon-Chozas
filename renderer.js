const {ipcRenderer} = require('electron')
const __LIST_APP__ = require("./list_app.json");

/*
///////////// REQUEST ////////////////
btn_login.addEventListener('click', function (event){
    
    btn_login.disabled = true;
    fetch("http://altaprevia.herokuapp.com")
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {

        switch ("ok") {
            case "ok":
                showHome()
                break;
            case "desactualizado":
                msg_login.innerHTML= "desactualizado";
                break;
            case "invalid":
                msg_login.innerHTML= "invalid";
                break;    
            default:
                msg_login.innerHTML= "Error Del Servidor";
                break;
        }

        btn_login.disabled = false;
    });
});

*/

///////////// SEND ////////////////
function showHome() {
    div_botones.style="display: initial;"
    div_login.style="display: none;"
}

function logout() {
    ipcRenderer.send('logout-launcher',{ message : "close"})
}

function openAPP (btn_element){
    btn_element.disabled = true;

    if (!__LIST_APP__[btn_element.id]) {
        btn_element.disabled = false;
        console.error("APP no existe o no esta declarada en: LIST_APP");
        return 1;
    }     
    ipcRenderer.send('open-app',__LIST_APP__[btn_element.id])
}

function login (){
    btn_login.disabled=true;
    ipcRenderer.send('login-launcher',{username : input_username.value,password : input_password.value })
}

////////// LISTEN ////////////////
ipcRenderer.on('reply-open-app',  (event, args_JSON) => {    
    if(args_JSON.error !== null ){
        document.querySelector(`#${args_JSON.id_button}`).disabled = false;
        document.querySelector(`#${args_JSON.id_message}`).innerHTML ="Error al Ejecutar la aplicacion. Informar al Area de Sistemas";
    }
    
    document.querySelector(`#${args_JSON.id_message}`).innerHTML = "Ejecutandose";
    
})

ipcRenderer.on('reply-close-app',  (event, args_JSON) => {

    if(args_JSON.error !== null ){
        document.querySelector(`#${args_JSON.id_message}`).innerHTML ="Error al cerrar Aplicacion";
    }
    document.querySelector(`#${args_JSON.id_message}`).innerHTML ="";
    document.querySelector(`#${args_JSON.id_button}`).disabled = false;
})

ipcRenderer.on('reply-login-launcher',  (event, args_JSON) => {

    btn_login.disabled=false;
    msg_login.innerHTML = args_JSON.hash;
});

/*
btn_sistema_chozas.addEventListener('click', function (event){
    this.disabled = true;
    ipcRenderer.send('open-app',{
        app_name : "sistema_chozas",
        app_path : "C:/chozassa_v2/chozassa_v2.exe",
        id_button : "btn_sistema_chozas",
        id_message : "msg_sistema_chozas"
        
    })
});

btn_hoja_de_ruta.addEventListener('click', function (event){
    this.disabled = true;
    ipcRenderer.send('open-app',{
        app_name : "sistema_chozas",
        app_path : "C:/hr2019/HR2019.exe",
        id_button : "btn_hoja_de_ruta",
        id_message : "msg_hoja_de_ruta"       
    })
});

*/