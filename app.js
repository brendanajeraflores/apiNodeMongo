/*
	Archivo para ejecutar api rest con conexión a MongoDB
	Autor Brenda Najera Flores
*/

//Variables para hacer conexión con MongoDB
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

//Variables para exportar el módulo de express
var express = require('express');
var app = express();

//Agregar cabeceras para que la api pueda ser consultada desde una aplicación web
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//Definición de rutas para consultar la api
var formatRouter = express.Router()
app.use('/', formatRouter);

//Definición de la ruta donde se consultara la colección etiquetas
formatRouter.route('/etiquetas').get(function(req, res, next){
    //Función para conectar con MongoDB
    MongoClient.connect(url, function(err, db) {
        if (!err){
            //Llamada a la función para consultar la colección etiquetas a MongoDB
            consultaEtiquetas(db, function(){})  
        } else {
            //Manda mensaje de error en caso no haberse conectado con la base de MongoDB
            console.log('No conectado a base MongoDB');         
        }
    });

    //Definición de la función para consultar la colección etiquetas
    var consultaEtiquetas = function(db){
        var tutorial = db.db("tutorial");
        var coleccionEtiquetas = tutorial.collection("etiquetas");
        console.log('bd conectada');
        var etiquetas =[];
        coleccionEtiquetas.find().toArray(function(error, etiquetas) {
            res.send({etiquetas : etiquetas});
        });
      }//Fin consultaEtiquetas
});//Fin route etiquetas

//Definición de la ruta donde se consultara la colección records
formatRouter.route('/records').get(function(req, res, next){
    //Función para conectar con MongoDB
    MongoClient.connect(url, function(err, db) {
        if (!err){
            //Llamada a la función para consultar la colección records a MongoDB
            consultaRecords(db, function(){})  
        } else {
            //Manda mensaje de error en caso no haberse conectado con la base de MongoDB
            console.log('No conectado a base MongoDB');         
        }
    });

    //Definición de la función para consultar la colección records
    var consultaRecords = function(db){
        var tutorial = db.db("tutorial");
        var coleccionRecords = tutorial.collection("records");
        console.log('bd conectada');
        var records =[];
        coleccionRecords.find().toArray(function(error, records) {
            res.send({records : records});
        });
      }//Fin consultaRecords
});//Fin route records

//Definición de la ruta donde se consultara la colección searches
formatRouter.route('/searches').get(function(req, res, next){
    //Función para conectar con MongoDB
    MongoClient.connect(url, function(err, db) {
        if (!err){
            //Llamada a la función para consultar la colección searches a MongoDB
            consultaSearches(db, function(){})  
        } else {
            //Manda mensaje de error en caso no haberse conectado con la base de MongoDB
            console.log('No conectado a base MongoDB');         
        }
    });

    //Definición de la función para consultar la colección searches
    var consultaSearches = function(db){
        var tutorial = db.db("tutorial");
        var coleccionSearches = tutorial.collection("searches");
        console.log('bd conectada');
        var searches =[];
        coleccionSearches.find().toArray(function(error, searches) {
            res.send({searches : searches});
        });
      }//Fin consultaSearches
});//Fin route searches

//Indicar el puerto en el que funcionará la api
app.listen(3000, function(){
	//Se muestra en pantalla el mensaje del puerto en el que esta funcionando la pi
    console.log('Conectado a puerto 3000');
});