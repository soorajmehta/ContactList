var firebase = require('firebase/app');
require("firebase/auth");
require("firebase/database");

 var config = {
                    apiKey: "AIzaSyDVgDz-1WqzOTInnq8CegbUFYPjCXgBk_c",
                    authDomain: "contactlistdev-e7971.firebaseapp.com",
                    databaseURL: "https://contactlistdev-e7971.firebaseio.com",
                    storageBucket: "contactlistdev-e7971.appspot.com",
                };

var FbApp = firebase.initializeApp(config);
module.exports = FbApp.database(); //this doesnt have to be database only