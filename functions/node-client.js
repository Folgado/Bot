
var admin = require('firebase-admin');
var firebase = require('firebase');
//var serviceAccount = require('./service-account.json');

firebase.initializeApp({
"serviceAccount": "./service-account.json",
"databaseURL": "https://facebookbot-91914.firebaseio.com"
});


var ref = firebase.app().database().ref("/User/usuario");
ref.once('value')
 .then(function (snap) {
 console.log('snap.val()', snap.val());
 });