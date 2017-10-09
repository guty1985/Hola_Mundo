// Web Server
var restify = require('restify');
// Invoca botbuilder al paquete
var builder = require('botbuilder');

// Crear Servidor

var server =restify.createServer();
// Se escucha en distintos puertos, particualrmente en el 3978
server.listen(process.env.port || process.env.PORT || 3978, function(){
    console.log('%s listening to %s',server.name,server.url);


});
// Se utiliza los bot para volverlos aplicacion web
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''

});

var bot = new builder.UniversalBot(connector);
server.post('api/messages',connector.listen());

// Dialogos
bot.dialog('/', [ //El alcance solo llega a un dialogo
    
    function (session) {
    session.send("![Contestacion](http://www.gifmania.com/Gif-Animados-Personas/Imagenes-Profesiones/Ejecutivos/Ejecutva-Hablando-Por-Telefono-59977.gif)");
    session.send('Buenas Tardes Restaurante San Pacal');//Preguntamos 
    builder.Prompts.text(session, '¿En que le puedo colaborar?');
    
    },
    
    function (session, results) {
    session.dialogData.lugar = results.response;
    session.beginDialog('/reserva');
    
    },
]);

bot.dialog('/reserva',[//Dialogo raiz y se crea dentro del bot
    function(session, results,next){//Objeto llamado session
            builder.Prompts.text(session, 'Con gusto ¿A nombre de Quien?');
    },
    function(session,results){
        let msj = results.response;
        session.userData.nombre = msj;
        session.beginDialog('/persona');
       
        // Saltamos pregunatndo nombre y luego invocamos la variable session.userData.nombre
    }
]);

bot.dialog('/persona',[//Dialogo raiz y se crea dentro del bot
    function(session, results,next){//Objeto llamado session
        session.send(`señor(a) ${session.userData.nombre}`);
        builder.Prompts.text(session, "¿A que horas desea hacer la reservacion?");
    },
    function(session,results){
        session.beginDialog('/hora_reserva');
        // Saltamos pregunatndo nombre y luego invocamos la variable session.userData.nombre
    }
]);




bot.dialog('/hora_reserva', [
    
    function (session) {
    
        builder.Prompts.text(session, 'Con gusto ¿Lo esperamos?');
    
    },
    
    function (session, results) {
        session.dialogData.lugar = results.response;
        session.beginDialog('/confirmar');
    
    
    }
]);

bot.dialog('/confirmar', [
    
    function (session) {
    
        session.send(`Buenas noches señor(a) ${session.userData.nombre}, los estabamos esperando`);//Preguntamos 
        session.send('Bienvenidos al restaurante San Pacal, tomen asiento por aquí por favor');
        builder.Prompts.text(session, "![bienvenida](http://www.deleitese.co/sites/default/files/styles/1000x550/public/2016/02/03/imagen/host.jpg?itok=49cvoeyc)");
    
    },
    
    function (session, results) {
    
        session.dialogData.lugar = results.response;
        session.beginDialog('/pedir_carta');
    
    }
]);

bot.dialog('/pedir_carta', [
    
    function(session, results,next){//Objeto llamado session
            session.send("![carta](http://www.restaurantecarmela.com/blog/wp-content/uploads/2014/03/carta-restaurante-sin-gluten-en-Granada.jpg)");
            builder.Prompts.text(session, "¿Que desea Ordenar?");
    
    },
    function(session,results){
           
            let msj = results.response;
            session.userData.pedido = msj;
            session.beginDialog('/pedido');
        // Saltamos pregunatndo nombre y luego invocamos la variable session.userData.nombre
    }
]);

bot.dialog('/pedido', [
    
    function (session) {
    
        session.send("![pedido](http://www.gifmania.com/Gif-Animados-Personas/Imagenes-Profesiones/Camareros/Camarero-Tomando-Pedido-60735.gif)");
        builder.Prompts.text(session, "¿Se le ofrece algo mas?");
    
    },
    
    function (session, results) {
    
    session.userData.bebida = results.response;
    session.beginDialog('/adicion_pedido');
    
    }
]);

bot.dialog('/adicion_pedido', [
    
    function (session) {
    
        session.send("![pedido](https://thumbs.gfycat.com/KeyAmbitiousGraywolf-max-1mb.gif)");
        builder.Prompts.text(session, "Por supuesto, le ofresco un vino de nuestra mejor cosecha");
    
    },
    
    function (session, results) {
    
    session.dialogData.lugar = results.response;
    session.beginDialog('/traer_pedido');
    
    }
]);

bot.dialog('/traer_pedido', [
    
    function (session) {
 
        session.send("De acuerdo ya regreso con su orden");
        session.send("![pedido](http://www.gifss.com/profesiones/camareros/camarero-02.gif)");
        builder.Prompts.text(session,`Como ordeno, ${session.userData.pedido}, que lo disfrute`);//Preguntamos
    },
    
    function (session, results) {
    
    session.dialogData.lugar = results.response;
    session.beginDialog('/traer_cuenta');
    
    }
]);

bot.dialog('/traer_cuenta', [
    
    function (session) {
        
        builder.Prompts.text(session,`Aqui esta su cuenta, son $ 35.000`);//Preguntamos
    },
    
    function (session, results) {
    
    session.dialogData.lugar = results.response;
    session.endConversation();
    session.beginDialog('/devolucion');
    
    }
]);

bot.dialog('/devolucion', [
    
    function (session) {
        session.send("![devolucion](https://i.pinimg.com/originals/66/9c/0f/669c0f462e224d4165af83557cffe739.gif)");
        builder.Prompts.text(session,`Aqui esta su cambio y gracias por preferir nuestro restaurante`);//Preguntamos
    },
    
    function (session, results) {
    
    session.userData.cambio = results.response;
    session.endConversation();
    session.beginDialog('/amor');
    
    }
]);

bot.dialog('/amor', [
    
    function (session) {
        session.send("Amor Gracias por la invitacion a comer, te amo")
        builder.Prompts.text(session,"![beso](https://i.pinimg.com/originals/6f/85/6a/6f856a56f177ba8222b16ca79ead125e.gif)");
    },
    
    function (session, results) {
    
    session.dialogData.lugar = results.response;
    session.beginDialog('/respuesta');
    
    }
]);

bot.dialog('/respuesta', [
    
    function (session) {
        session.send("![beso](http://www.goodlightscraps.com/content/smiley-gif/smiley-7.gif)");
        session.send("Hasta mañana,que descanses")
    },
    
    function (session, results) {
    
    session.dialogData.lugar = results.response;
    session.endDialog();
    
    }
]);

