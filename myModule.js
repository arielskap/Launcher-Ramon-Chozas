exports.modules = {    
    ejecuta : function() {
    child.exec("C:/Manten/manten.exe",{
        encoding: 'cp850'
    }, function(err, data) {
        // Sino valido exactamente por este codigo, tira un error cada vez que se cierre el sistema chozas. 
        //Asi que siempre que se cierre el programa, va a entrar al ELSE de este IF
        //if(err.code === "ENOENT"){
            if(err){
            console.log(err)
            createWindow("error.html")
            }
            else{
            console.log(data.toString());
            app.quit()
            }
    
    });
    },
    
    ejecutaAPP_Manten : function () {
    child.exec("C:/Manten/manten.exe",{
        encoding: 'cp850'
    }, function(err, data) {
        // Sino valido exactamente por este codigo, tira un error cada vez que se cierre el sistema chozas. 
        //Asi que siempre que se cierre el programa, va a entrar al ELSE de este IF
        //if(err.code === "ENOENT"){
            if(err){
            console.log(err)
            createWindow("error.html")
            }
            else{
            console.log(data.toString());
            app.quit()
            }
    
    });
    },
    
    obtieneVersionDelServidor : function (callback){
    let data_ws=''
    const options = {
        hostname: 'www.dynamicdoc.com.ar',
        path: '/node/build/validVersion/hash',
        method: 'GET',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    
    const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => data_ws+= chunk);
        res.on('end', () => {
        try {
            const parsedData = JSON.parse(data_ws);
            callback(parsedData.hash,parsedData.all_dependencies);
        } catch (e) {
            console.error(`ERROR= 
            ${e.message}`);
        }
        });
    });
    
    req.on('error', (e) => {
        console.error(`problem with request: 
        ${e.message}`);
    });
    
    req.end();
    
    },
    
    obtieneVersionLocal : function(callback) {
        
    new Promise((resolve, reject) => {
        const hash = crypto.createHash("md5");
        const stream = fs.createReadStream(__SISTEMA_CHOZAS__);
        stream.on("error", err => reject(err));
        stream.on("data", chunk =>  hash.update(chunk));
        stream.on("end", () => resolve(hash.digest("hex")));
    })
    .then(hex => {
        callback(hex)
    }).catch(err => {
        console.error(err)
    })
    },
    
    actualizaSistema : function(dependencias) {
    
    let array_dependencies = dependencias.split("&");
    
    let prueba = "C:/Windows/system32/cmd.exe /k cd C:/chozassa_v2 & curl www.dynamicdoc.com.ar/node/build/upgrade/chozassa_v2.exe -o C:/chozassa_v2/chozassa_v2.exe & "
    +"curl www.dynamicdoc.com.ar/node/build/upgrade/cda70.pbd -o C:/chozassa_v2/cda70.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/chozassa.pbd -o C:/chozassa_v2/chozassa.pbd & "
    +"curl www.dynamicdoc.com.ar/node/build/upgrade/compras.pbd -o C:/chozassa_v2/compras.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/costos.pbd -o C:/chozassa_v2/costos.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/ctactedi.pbd -o C:/chozassa_v2/ctactedi.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/ctactein.pbd -o C:/chozassa_v2/ctactein.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/dw2xls_pb7.pbd -o C:/chozassa_v2/dw2xls_pb7.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/facturas.pbd -o C:/chozassa_v2/facturas.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/factusa.pbd -o C:/chozassa_v2/factusa.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/fletes.pbd -o C:/chozassa_v2/fletes.pbd & "
    +"curl www.dynamicdoc.com.ar/node/build/upgrade/listados.pbd -o C:/chozassa_v2/listados.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/log.pbd -o C:/chozassa_v2/log.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/mante.pbd -o C:/chozassa_v2/mante.pbd & "
    +"curl www.dynamicdoc.com.ar/node/build/upgrade/multi.pbd -o C:/chozassa_v2/multi.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/producc.pbd -o C:/chozassa_v2/producc.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/ras5.pbd -o C:/chozassa_v2/ras5.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/stock.pbd -o C:/chozassa_v2/stock.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/stocksuc.pbd -o C:/chozassa_v2/stocksuc.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/tablas.pbd -o C:/chozassa_v2/tablas.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/tablasuc.pbd -o C:/chozassa_v2/tablasuc.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/uo_std.pbd -o C:/chozassa_v2/uo_std.pbd & "
    +"curl www.dynamicdoc.com.ar/node/build/upgrade/valores.pbd -o C:/chozassa_v2/valores.pbd & curl www.dynamicdoc.com.ar/node/build/upgrade/config_chozas_v2.txt -o C:/chozassa_v2/config_chozas_v2.ini & exit";
    
    child.exec(prueba, function(err, data) {
        if (err) {
            console.log("-------------------------------------------------")
            console.log(err)
            app.quit()
        }
        console.log(data.toString());
    });
    
    }
}
