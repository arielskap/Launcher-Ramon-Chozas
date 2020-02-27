let version_local
let version_servidor

const fs = require("fs");
const crypto = require("crypto");
const child = require('child_process');

function obtieneVersionDelServidor(){
    fetch("http://www.dynamicdoc.com.ar/node/build/validVersion/hash")
    .then(result => result.json())
    .catch(error =>{
        console.error('Error:', error)
    })
    .then(response => {
        version_servidor = response.hash
        console.log('Servidor :', version_servidor)
        if(version_servidor === version_local){
            console.log("PERFECTO")
        }else{
            console.log("Hay que Actualizar")
        }
    });
}
    
function obtieneVersionLocal() {
      
    new Promise((resolve, reject) => {
        const hash = crypto.createHash("md5");
        const stream = fs.createReadStream("C:/chozassa_v2/chozassa_v2.exe");
        stream.on("error", err => reject(err));
        stream.on("data", chunk =>  hash.update(chunk));
        stream.on("end", () => resolve(hash.digest("hex")));
    })
    .then(hex => {
        version_local = hex
        console.log('Local    :', version_local)
        return
    }).catch(err => {
        console.error(err)
    })
}

function validPassword(){
    fetch("http://www.dynamicdoc.com.ar/node/build/validVersion/hash")
    .then(result => result.json())
    .catch(error =>{
        console.error('Error:', error)
    })
    .then(response => {
            
        message_password.innerHTML = "Debe actualizar su contraseña";

    });
}

function openAPP(id_boton,nameApp) {
    document.querySelector(`#${id_boton}`).setAttribute("disabled","");
    child.execFile(nameApp, function(err, stdout,stderr) {
        if(err){
            console.log(err)
        }
    });

    child.on
}

b_sistema_chozas.addEventListener("click",function(){
    openAPP(this.id,"C:/chozassa_v2/chozassa_v2.exe")
})

b_mantenimiento.addEventListener("click",function(){
    openAPP(this.id,"C:/Manten/manten.exe")
})

//validPassword()
//obtieneVersionLocal()
//obtieneVersionDelServidor()



