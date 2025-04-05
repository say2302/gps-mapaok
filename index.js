const express = require('express'),
      colors = require("colors"),
      AedesApp    = require("aedes")(),
      bodyParser = require('body-parser');
	  AedesServer = require("net").createServer(AedesApp.handle),
      path = require('path');

const app = express();
const expressPORT = 3000;
const aedesPORT = 1883;

// Servir archivos estáticos desde la carpeta 'public'
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    console.log("sdsdd");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(expressPORT, () => {
    console.log(`Servidor escuchando en http://localhost:${expressPORT}`);
});



// -- Display de presentación del Servidor -- //
console.log(
    ('* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *\n' +
     '*                        .:: AEDES SERVER ::.                      *\n' +
     '* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *'
    ).yellow
);
console.log("- Sistema Informático listo para su utilización -".green);
console.log("  1. - En espera de conexión del Cliente Aedes".green);
// -- Display de presentación del Servidor -- //

// -- Sección Dataflow -- //
// Este evento se encarga de inicializar el Servidor //
// Evento -> "listen" //
AedesServer
    .listen(
        aedesPORT,
        () => {
            console.log(`Servidor escuchando en http://localhost:${aedesPORT}`);
            // - Autenticación y Subscripción del Cliente en el Servidor - //
            AedesApp.authenticate       = clientAuthentication; //
            AedesApp.authorizeSubscribe = clientSubscription; //
            // - Autenticación y Subscripción del Cliente en el Servidor - //
        }
    );

// Este evento se encarga de notificar si el Servidor presenta deficiencia en el instante de ejecución //
// Evento -> "connectionError" //
AedesApp
    .on(
        "connectionError", 
        (error) => {
            // - Notificación de deficiencia funcional del Servidor - //
            console.log("    1.1 - Error interno crítico. Contacte con el Administrador".red);
            // - Notificación de deficiencia funcional del Servidor - //
        }
    )

// Este evento se encarga de detectar la conexión del Cliente con el Servidor //
// Evento -> "client" //
    .on(
        "client", 
        (client) => {
            console.log("  1. - Conectado: ".green, client.id);

        }
    )

// Este evento se encarga de detectar la pérdida de conexión del Cliente con el Servidor //
// Evento -> "clientDisconnect" //
    .on(
        "clientDisconnect",
        (client) => {
            console.log("  1. - Desconectado: ".red, client.id);
        }
    )

// Este evento se encarga de recibir información del Cliente //
// Evento -> "publish" //
    .on(
        "publish",
        (ethernetInfo) => {
            // - Se convierte la información recibida de Hexagesimal a ASCII - //
            let ethernetData = ethernetInfo.payload.toString();
            console.log("  2. - Info: ".green, ethernetData);
        }
    );
// -- Sección Dataflow -- //

// -- Funciones del Servidor -- //
// Esta función se encarga de otorgar acceso al Cliente al Servidor //
// Función -> clientAuthentication(cliente: string, credential: string, key: string, callback) //
function clientAuthentication(client, credential, key, callback) {
    console.log("clientAuthentication");
    //if (client.id && credential && key) { }
}

// Esta función se encarga de inscribir al Cliente al Servidor //
// Función -> clientSubscription(client: string, subscription: string, callback) //
function clientSubscription(client, subscription, callback) { 
    console.log("clientSubscription");
    //if (client && subscription) { }
}
// -- Funciones del Servidor -- //