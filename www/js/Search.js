
var myDB;
//Open Database Connection
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    myDB = window.sqlitePlugin.openDatabase({ name: "mySQLite3.db", location: 'default' });
}

function SearchClicked() {

     // check if a table exists if not create one otherwise use the one which is already there.
    var property = ((document.getElementById("property") || {}).value) || "";
    myDB.transaction( 
        function (transaction) {
            transaction.executeSql('CREATE TABLE IF NOT EXISTS MyTable ( id integer primary key autoincrement , rent text, name text , bedroom text, date text unique , property text , furniture text , notes text , lat real , lang real )', [],
                function (tx, result) {
                   
                },
                function (error) {
                    alert("Error occurred while creating the table.");
                });
        });
    // getting the reference to the paragraph tag on the Search.html with id = data
    var data = document.getElementById("data");
}
   

}
document.addEventListener('backbutton', function () {
     // go back to the main screen on back button pressed.
        window.location.href="index.html";
   });
